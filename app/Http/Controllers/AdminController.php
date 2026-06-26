<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Report;
use App\Models\Comment;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private function checkAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || !$user->is_admin) {
            return false;
        }
        return true;
    }

    public function overview(Request $request)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $totalUsers = User::count();
        $onlineUsers = User::whereNotNull('user_token')->count();
        $totalReports = Report::count();
        $totalComments = Comment::count();

        // Build recent activities dynamically
        $recentReports = Report::with('user')->orderBy('created_at', 'desc')->limit(5)->get();
        $recentComments = Comment::with(['user', 'report'])->orderBy('created_at', 'desc')->limit(5)->get();

        $activities = [];

        foreach ($recentReports as $r) {
            $activities[] = [
                'id' => 'report_' . $r->id,
                'type' => 'report',
                'user' => $r->user->name ?? 'Anonim',
                'title' => $r->title,
                'time' => $r->created_at->toIso8601String(),
                'detail' => $r->location,
            ];
        }

        foreach ($recentComments as $c) {
            $activities[] = [
                'id' => 'comment_' . $c->id,
                'type' => 'comment',
                'user' => $c->user->name ?? 'Anonim',
                'title' => $c->report->title ?? 'Laporan dihapus',
                'time' => $c->created_at->toIso8601String(),
                'detail' => substr($c->comment_text, 0, 50) . (strlen($c->comment_text) > 50 ? '...' : ''),
            ];
        }

        // Sort combined activities by time desc
        usort($activities, function($a, $b) {
            return strcmp($b['time'], $a['time']);
        });

        // Limit to 6
        $activities = array_slice($activities, 0, 6);

        return response()->json([
            'stats' => [
                'total_users' => $totalUsers,
                'online_users' => $onlineUsers,
                'total_reports' => $totalReports,
                'total_comments' => $totalComments,
            ],
            'activities' => $activities,
        ]);
    }

    public function users(Request $request)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $users = User::withCount(['reports', 'comments'])->get();

        return response()->json($users->map(function($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'telp' => $u->telp,
                'status' => $u->user_token ? 'online' : 'offline',
                'reports_count' => $u->reports_count,
                'comments_count' => $u->comments_count,
                'joined_date' => $u->created_at->toDateString(),
            ];
        }));
    }

    public function userDetails(Request $request, $id)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $user = User::with(['reports', 'comments.report'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'telp' => $user->telp,
            'joined_date' => $user->created_at->toDateString(),
            'reports' => $user->reports->map(function($r) {
                return [
                    'id' => $r->id,
                    'title' => $r->title,
                    'status' => $r->status,
                    'location' => $r->location,
                    'createdAt' => $r->created_at->toIso8601String(),
                ];
            }),
            'comments' => $user->comments->map(function($c) {
                return [
                    'id' => $c->id,
                    'comment_text' => $c->comment_text,
                    'report_title' => $c->report->title ?? 'Laporan dihapus',
                    'createdAt' => $c->created_at->toIso8601String(),
                ];
            }),
        ]);
    }

    public function forceLogout(Request $request, $id)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $user->user_token = null;
        $user->save();

        return response()->json(['message' => "Sesi user {$user->name} berhasil diputus"]);
    }

    public function reports(Request $request)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $reports = Report::with(['user', 'comments'])->get();

        return response()->json($reports->map(function($r) {
            return [
                'id' => $r->id,
                'title' => $r->title,
                'category' => $r->category,
                'urgency' => $r->urgency,
                'status' => $r->status,
                'location' => $r->location,
                'description' => $r->description,
                'reporter_name' => $r->user->name ?? 'Anonim',
                'comments_count' => $r->comments->count(),
                'createdAt' => $r->created_at->toIso8601String(),
            ];
        }));
    }

    public function toggleReportStatus(Request $request, $id)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $report = Report::find($id);
        if (!$report) {
            return response()->json(['message' => 'Laporan tidak ditemukan'], 404);
        }

        $report->status = ($report->status === 'aktif') ? 'selesai' : 'aktif';
        $report->save();

        return response()->json([
            'message' => 'Status laporan berhasil diperbarui',
            'status' => $report->status,
        ]);
    }

    public function deleteReport(Request $request, $id)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $report = Report::find($id);
        if (!$report) {
            return response()->json(['message' => 'Laporan tidak ditemukan'], 404);
        }

        $report->delete();

        return response()->json(['message' => 'Laporan berhasil dihapus']);
    }

    public function comments(Request $request)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $comments = Comment::with(['user', 'report'])->get();

        return response()->json($comments->map(function($c) {
            return [
                'id' => $c->id,
                'user_name' => $c->user->name ?? 'Anonim',
                'report_title' => $c->report->title ?? 'Laporan dihapus',
                'comment_text' => $c->comment_text,
                'createdAt' => $c->created_at->toIso8601String(),
            ];
        }));
    }

    public function deleteComment(Request $request, $id)
    {
        if (!$this->checkAdmin($request)) {
            return response()->json(['message' => 'Akses ditolak. Khusus Admin.'], 403);
        }

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus']);
    }
}
