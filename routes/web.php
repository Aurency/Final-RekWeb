<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Root route untuk mengarah ke halaman To-Do List
Route::get('/', [TodoController::class, 'index'])->name('todos.index');

// Dashboard route (hanya dapat diakses setelah login)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes (profile yang dapat diedit)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Resource routes untuk To-Do (CRUD operasi untuk To-Do List)
Route::middleware('auth')->group(function () {
    Route::resource('todos', TodoController::class);
});

require __DIR__.'/auth.php';
