<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    // Step 1: Kirim kode reset password ke email
    public function sendResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'Email tidak terdaftar di sistem kami.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
        ]);

        // Generate kode 6 digit
        $code = rand(100000, 999999);
        $expiresAt = Carbon::now()->addMinutes(10);

        $user = User::where('email', $request->email)->first();
        $user->update([
            'password_reset_code' => $code,
            'password_reset_expires_at' => $expiresAt,
        ]);

        try {
            Mail::send('emails.reset-password', ['code' => $code, 'user' => $user], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Kode Reset Password - Save Cat');
            });
        } catch (\Exception $e) {
            \Log::error('Failed to send reset password email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Kode verifikasi telah dikirim ke email Anda.',
        ]);
    }

    // Step 2: Verifikasi kode reset password
    public function verifyResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)
                    ->where('password_reset_code', $request->code)
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Kode verifikasi tidak valid.',
            ], 400);
        }

        if (Carbon::parse($user->password_reset_expires_at)->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'Kode verifikasi sudah kedaluwarsa. Silakan minta kode baru.',
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Kode verifikasi valid.',
        ]);
    }

    // Step 3: Reset password baru
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)
                    ->where('password_reset_code', $request->code)
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Kode verifikasi tidak valid.',
            ], 400);
        }

        if (Carbon::parse($user->password_reset_expires_at)->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'Kode verifikasi sudah kedaluwarsa. Silakan minta kode baru.',
            ], 400);
        }

        // Cek apakah password baru sama dengan password lama
        if (Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password baru tidak boleh sama dengan password lama. Silakan gunakan password yang berbeda.',
            ], 400);
        }

        // Update password dan hapus kode reset
        $user->update([
            'password' => Hash::make($request->password),
            'password_reset_code' => null,
            'password_reset_expires_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diubah. Silakan login dengan password baru.',
        ]);
    }

    // Resend kode reset password
    public function resendResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $code = rand(100000, 999999);
        $expiresAt = Carbon::now()->addMinutes(10);

        $user = User::where('email', $request->email)->first();
        $user->update([
            'password_reset_code' => $code,
            'password_reset_expires_at' => $expiresAt,
        ]);

        try {
            Mail::send('emails.reset-password', ['code' => $code, 'user' => $user], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Kode Reset Password - Save Cat');
            });
        } catch (\Exception $e) {
            \Log::error('Failed to resend reset password email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Kode verifikasi baru telah dikirim ke email Anda.',
        ]);
    }
}