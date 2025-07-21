<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION, 
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('location', function() {
    return Inertia::render('Location');
})->name('location');

Route::get('/maps', function() {
    return Inertia::render('Maps');
})->name('maps');

Route::get('location/{id}', function() {
    return Inertia::render('Details');
})->name('details');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/permissions', PermissionController::class);

    Route::resource('/roles', RoleController::class)->except('show');

    Route::resource('/users', UserController::class);

    Route::resource('/categories', CategoriesController::class);

    Route::resource('/locations', LocationsController::class);

    Route::resource('/tickets', TicketController::class);

    Route::resource('/reviews', ReviewsController::class);

    Route::resource('/transactions', TransactionController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
