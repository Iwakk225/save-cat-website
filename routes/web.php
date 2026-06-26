<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Fallback route for React Router client-side routing
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api|up).*$');
