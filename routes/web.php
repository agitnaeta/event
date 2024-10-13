<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::any("/",[EventController::class,"index"])->name('event.index');

Route::any("/notification", function (){
    return inertia("Notification");
})->name('notification.index');
Route::resource('events',EventController::class)->except("index");
Route::resource('notification', NotificationController::class);
