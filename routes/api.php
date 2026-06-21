<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ForgotPasswordController;

// Public routes (tidak perlu token)
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/resend-verification', [RegisterController::class, 'resendVerificationCode']);
Route::post('/login', [LoginController::class, 'login']);

// Forgot Password routes
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetCode']);
Route::post('/verify-reset-code', [ForgotPasswordController::class, 'verifyResetCode']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);
Route::post('/resend-reset-code', [ForgotPasswordController::class, 'resendResetCode']);

// Protected routes (butuh token)
Route::middleware('auth.user_token')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', [LoginController::class, 'user']);
});