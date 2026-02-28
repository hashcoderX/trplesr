<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ItineraryController;
use App\Http\Controllers\CustomQuoteController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These routes are loaded by the RouteServiceProvider and all will
| be assigned to the "api" middleware group. Make something great!
*/

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Example protected test route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Profile routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::patch('/profile', [ProfileController::class, 'update']);
});

// Public services data
Route::prefix('services')->group(function () {
    Route::get('/hotels', [ServicesController::class, 'hotels']);
    Route::get('/activities', [ServicesController::class, 'activities']);
    Route::get('/restaurants', [ServicesController::class, 'restaurants']);
    Route::get('/rentals', [ServicesController::class, 'rentals']);
});

// Public itineraries
Route::get('/itineraries', [ItineraryController::class, 'index']);
Route::get('/itineraries/{itinerary}', [ItineraryController::class, 'show']);

// Public image proxy for itineraries
Route::get('/itinerary-images/{filename}', [ImageController::class, 'itinerary'])
    ->where('filename', '[A-Za-z0-9._-]+');

// Public image proxies for hotels, activities, and restaurants
Route::get('/hotel-images/{filename}', [ImageController::class, 'hotel'])
    ->where('filename', '[A-Za-z0-9._-]+');

Route::get('/activity-images/{filename}', [ImageController::class, 'activity'])
    ->where('filename', '[A-Za-z0-9._-]+');

Route::get('/restaurant-images/{filename}', [ImageController::class, 'restaurant'])
    ->where('filename', '[A-Za-z0-9._-]+');

// Custom quotes
Route::post('/custom-quotes', [CustomQuoteController::class, 'store']);

// Chat routes
Route::prefix('chat')->group(function () {
    Route::post('/start', [ChatController::class, 'start']);
    Route::get('/{conversation}/messages', [ChatController::class, 'messages']);
    Route::post('/{conversation}/messages', [ChatController::class, 'send']);
});

// Admin routes
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::apiResource('destinations', DestinationController::class);
    Route::apiResource('hotels', HotelController::class);
    Route::apiResource('itineraries', ItineraryController::class)->except(['show']);
    Route::get('chats', [ChatController::class, 'adminList']);
});
