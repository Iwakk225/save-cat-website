<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::with(['user', 'images', 'comments']);

        // Search filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function($qu) use ($search) {
                      $qu->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Category filter
        if ($request->filled('category') && $request->input('category') !== 'semua') {
            $query->where('category', $request->input('category'));
        }

        // Status filter
        if ($request->filled('status') && $request->input('status') !== 'semua') {
            $query->where('status', $request->input('status'));
        }

        // Sorting
        $sortBy = $request->input('sortBy', 'terbaru');
        if ($sortBy === 'terbaru') {
            $query->orderBy('created_at', 'desc');
        } elseif ($sortBy === 'terlama') {
            $query->orderBy('created_at', 'asc');
        } elseif ($sortBy === 'komentar') {
            $query->withCount('comments')->orderBy('comments_count', 'desc');
        } elseif ($sortBy === 'urgensi') {
            $query->orderByRaw("CASE urgency 
                WHEN 'tinggi' THEN 1 
                WHEN 'sedang' THEN 2 
                WHEN 'rendah' THEN 3 
                ELSE 4 END ASC");
        }

        $perPage = $request->input('per_page', 8);
        $reports = $query->paginate($perPage);

        // Map results to match frontend expectation
        $items = collect($reports->items())->map(function($report) {
            $firstImage = $report->images->first();
            $imagePath = $firstImage ? $firstImage->image_path : 'https://placecats.com/400/300';
            $imageUrl = (str_starts_with($imagePath, 'http://') || str_starts_with($imagePath, 'https://')) 
                ? $imagePath 
                : asset('storage/' . $imagePath);

            return [
                'id' => $report->id,
                'title' => $report->title,
                'category' => $report->category,
                'urgency' => $report->urgency,
                'status' => $report->status,
                'location' => $report->location,
                'description' => $report->description,
                'reporter' => $report->user->name ?? 'Anonim',
                'contact' => $report->contact,
                'comments' => $report->comments->count(),
                'createdAt' => $report->created_at->toIso8601String(),
                'image' => $imageUrl,
                'tags' => $report->tags ?? [],
            ];
        });

        // Calculate stats for stats strip
        $stats = [
            'total' => Report::count(),
            'aktif' => Report::where('status', 'aktif')->count(),
            'selesai' => Report::where('status', 'selesai')->count(),
            'darurat' => Report::where('urgency', 'tinggi')->count(),
        ];

        return response()->json([
            'reports' => $items,
            'stats' => $stats,
            'pagination' => [
                'current_page' => $reports->currentPage(),
                'last_page' => $reports->lastPage(),
                'per_page' => $reports->perPage(),
                'total' => $reports->total(),
            ]
        ]);
    }

    public function show($id)
    {
        $report = Report::with(['user', 'images', 'comments.user'])->find($id);

        if (!$report) {
            return response()->json(['message' => 'Laporan tidak ditemukan'], 404);
        }

        // Return details
        return response()->json([
            'id' => $report->id,
            'title' => $report->title,
            'category' => $report->category,
            'urgency' => $report->urgency,
            'status' => $report->status,
            'location' => $report->location,
            'description' => $report->description,
            'reporter' => $report->user->name ?? 'Anonim',
            'contact' => $report->contact,
            'comments_count' => $report->comments->count(),
            'createdAt' => $report->created_at->toIso8601String(),
            'images' => $report->images->map(function($img) {
                return (str_starts_with($img->image_path, 'http://') || str_starts_with($img->image_path, 'https://')) 
                    ? $img->image_path 
                    : asset('storage/' . $img->image_path);
            }),
            'tags' => $report->tags ?? [],
            'comments' => $report->comments->map(function($c) {
                return [
                    'id' => $c->id,
                    'user_id' => $c->user_id,
                    'name' => $c->user->name ?? 'Anonim',
                    'comment_text' => $c->comment_text,
                    'createdAt' => $c->created_at->toIso8601String(),
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'urgency' => 'required|string',
            'location' => 'required|string',
            'description' => 'required|string',
            'contact' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        // Simple tag inference based on category/title
        $tags = [];
        if ($request->input('urgency') === 'tinggi') {
            $tags[] = 'Butuh Segera';
        }
        if ($request->input('category') === 'terluka') {
            $tags[] = 'Luka Fisik';
        }
        if ($request->input('category') === 'terlantar') {
            $tags[] = 'Terlantar';
        }

        $report = Report::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'category' => $request->input('category'),
            'urgency' => $request->input('urgency'),
            'status' => 'aktif',
            'location' => $request->input('location'),
            'description' => $request->input('description'),
            'contact' => $request->input('contact'),
            'tags' => $tags,
        ]);

        // Process images if any
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('reports', 'public');
                ReportImage::create([
                    'report_id' => $report->id,
                    'image_path' => $path,
                ]);
            }
        } elseif ($request->has('images')) {
            // Check if there are base64 or array of files or something
            // If they are sent as individual files or if none, we will seed placeholder
            ReportImage::create([
                'report_id' => $report->id,
                'image_path' => 'https://placecats.com/400/300',
            ]);
        } else {
            ReportImage::create([
                'report_id' => $report->id,
                'image_path' => 'https://placecats.com/400/300',
            ]);
        }

        return response()->json([
            'id' => $report->id,
            'message' => 'Laporan berhasil dibuat',
        ], 201);
    }
}
