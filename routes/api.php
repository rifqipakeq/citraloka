<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/nearest-destinations', [\App\Http\Controllers\User\LocationsController::class, 'nearestDestinations'])->name('api.nearest-destinations');
Route::post('/chatbot/generate-response', [\App\Http\Controllers\ChatbotController::class, 'generateResponse'])->name('api.chatbot.generate-response');
