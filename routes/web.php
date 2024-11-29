<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use Inertia\Inertia;


Route::middleware('auth')->group(function () {
    Route::get('/', [PageController::class, 'index'])->name('page.index');
    Route::get('/activity', [PageController::class, 'activity'])->name('page.activity');
    Route::get('/search', [PageController::class, 'search'])->name('page.search');
    Route::get('/profile', [PageController::class, 'profile'])->name('page.profile');
    Route::resource('post', PostController::class);
    Route::get('/comments/create/{post}', [CommentController::class, 'create'])->name('comments.create');
    Route::post("/comments/create", [CommentController::class, 'store'])->name('comment.store');
    Route::post('/posts/{post}/like', [LikeController::class, 'toggleLike'])->name('post.like');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
