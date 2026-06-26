<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ForgotPasswordController;

use App\Http\Controllers\ReportController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AdminController;

// Public routes (tidak perlu token)
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/resend-verification', [RegisterController::class, 'resendVerificationCode']);
Route::post('/login', [LoginController::class, 'login']);

// Reports public routes
Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);

// Forgot Password routes
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetCode']);
Route::post('/verify-reset-code', [ForgotPasswordController::class, 'verifyResetCode']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);
Route::post('/resend-reset-code', [ForgotPasswordController::class, 'resendResetCode']);

// Protected routes (butuh token)
Route::middleware('auth.user_token')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', [LoginController::class, 'user']);
    
    // Reports & Comments authenticated routes
    Route::post('/reports', [ReportController::class, 'store']);
    Route::post('/reports/{id}/comments', [CommentController::class, 'store']);

    // Admin dashboard routes (checks is_admin inside controller)
    Route::get('/admin/overview', [AdminController::class, 'overview']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/users/{id}', [AdminController::class, 'userDetails']);
    Route::post('/admin/users/{id}/logout', [AdminController::class, 'forceLogout']);
    Route::get('/admin/reports', [AdminController::class, 'reports']);
    Route::post('/admin/reports/{id}/status', [AdminController::class, 'toggleReportStatus']);
    Route::delete('/admin/reports/{id}', [AdminController::class, 'deleteReport']);
    Route::get('/admin/comments', [AdminController::class, 'comments']);
    Route::delete('/admin/comments/{id}', [AdminController::class, 'deleteComment']);
});