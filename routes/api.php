<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

// Public routes (tidak perlu token)
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/resend-verification', [RegisterController::class, 'resendVerificationCode']);
Route::post('/login', [LoginController::class, 'login']);

// Protected routes (butuh token)
Route::middleware('auth.user_token')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', [LoginController::class, 'user']);
});