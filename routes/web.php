<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::get("/",[EventController::class,"index"]);

Route::get("/notification", function (){
    return inertia("Notification");
});
Route::resource('events',EventController::class)->except("index");
Route::resource('notification', NotificationController::class);

Route::get("/run",function (){
    \Illuminate\Support\Facades\Artisan::call("queue:work");
});
