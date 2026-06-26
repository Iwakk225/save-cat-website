<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request, $reportId)
    {
        $validator = Validator::make($request->all(), [
            'comment_text' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $report = Report::find($reportId);
        if (!$report) {
            return response()->json(['message' => 'Laporan tidak ditemukan'], 404);
        }

        $user = $request->user();

        $comment = Comment::create([
            'report_id' => $reportId,
            'user_id' => $user->id,
            'comment_text' => $request->input('comment_text'),
        ]);

        return response()->json([
            'id' => $comment->id,
            'user_id' => $comment->user_id,
            'name' => $user->name,
            'comment_text' => $comment->comment_text,
            'createdAt' => $comment->created_at->toIso8601String(),
            'message' => 'Komentar berhasil ditambahkan',
        ], 201);
    }
}
