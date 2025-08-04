<?php

use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Dashboard\CategoriesController;
use App\Http\Controllers\Dashboard\LocationsController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\PermissionController;
use App\Http\Controllers\Dashboard\ReviewsController;
use App\Http\Controllers\Dashboard\RoleController;
use App\Http\Controllers\Dashboard\TicketController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\RegionController;
use App\Http\Controllers\Dashboard\TicketCategoryController;

use App\Http\Controllers\User\LocationsController as UserLocationsController;
use App\Http\Controllers\User\LocationDetailController;
use App\Http\Controllers\User\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/location', [UserLocationsController::class, 'index'])->name('location.index');
Route::get('/location/{id}', [LocationDetailController::class, 'index'])->name('detail.index');
Route::get('/maps', [UserLocationsController::class, 'maps'])->name('location.maps');



Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::resource('/permissions', PermissionController::class);

    Route::resource('/roles', RoleController::class)->except('show');

    Route::resource('/users', UserController::class);

    Route::resource('/categories', CategoriesController::class);

    Route::resource('/locations', LocationsController::class);

    Route::resource('/tickets', TicketController::class);

    Route::resource('/regions', RegionController::class);

    Route::resource('/ticket-categories', TicketCategoryController::class);

    Route::resource('/reviews', ReviewsController::class);

    // Route::put('/reviews/{id}', [ReviewsController::class, 'update'])->name('reviews.update');

    Route::resource('/transactions', TransactionController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
