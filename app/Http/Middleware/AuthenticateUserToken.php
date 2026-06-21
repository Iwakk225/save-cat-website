<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AuthenticateUserToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        
        if (str_starts_with($token, 'Bearer ')) {
            $token = substr($token, 7);
        }

        if (!$token) {
            return response()->json(['message' => 'Token tidak ditemukan'], 401);
        }

        $hashedToken = hash('sha256', $token);
        $user = User::where('user_token', $hashedToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Token tidak valid'], 401);
        }

        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}