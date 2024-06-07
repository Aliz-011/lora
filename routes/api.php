<?php

use App\Http\Controllers\Api\AlternatifController;
use App\Http\Controllers\Api\KriteriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');