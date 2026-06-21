<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'telp' => 'required|string|max:20',
        ]);

        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser && !$existingUser->email_verified_at) {
            $user = $existingUser;
            $message = 'Kode verifikasi baru telah dikirim. Silakan cek email.';
        } elseif ($existingUser && $existingUser->email_verified_at) {
            return response()->json([
                'message' => 'Email sudah terdaftar dan terverifikasi.'
            ], 409);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'telp' => $request->telp,
                'is_admin' => false,
            ]);
            $message = 'Registrasi berhasil. Silakan cek email untuk kode verifikasi.';
        }

        $code = rand(100000, 999999);
        $user->update([
            'name' => $request->name,
            'password' => $request->password,
            'telp' => $request->telp,
            'verification_code' => Hash::make($code),
            'verification_code_expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(new VerificationCodeMail($code, $user->name));

        return response()->json([
            'message' => $message,
            'user_id' => $user->id,
        ], 201);
    }
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->input('email'))
            ->whereNotNull('verification_code')
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan atau sudah terverifikasi.'
            ], 404);
        }

        if ($user->verification_code_expires_at < now()) {
            return response()->json([
                'message' => 'Kode verifikasi sudah kedaluwarsa. Silakan minta kode baru.'
            ], 400);
        }

        if (!Hash::check($request->input('code'), $user->verification_code)) {
            return response()->json([
                'message' => 'Kode verifikasi tidak valid.'
            ], 400);
        }

        $user->update([
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_code_expires_at' => null,
        ]);

        return response()->json([
            'message' => 'Email berhasil diverifikasi. Silakan login.'
        ]);
    }
    public function resendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->input('email'))
            ->whereNull('email_verified_at')
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan atau sudah terverifikasi.'
            ], 404);
        }

        $code = rand(100000, 999999);

        $user->update([
            'verification_code' => Hash::make($code),
            'verification_code_expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(new VerificationCodeMail($code, $user->name));

        return response()->json([
            'message' => 'Kode verifikasi baru telah dikirim ke email Anda.'
        ]);
    }
}