<?php

use App\Http\Controllers\Api\AlternatifController;
use App\Http\Controllers\Api\KriteriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/alternatifs', [AlternatifController::class, 'index'])->name('alternatifs.index');
Route::get('/alternatifs/{id}', [AlternatifController::class, 'show'])->name('alternatifs.show');
Route::get('kriterias', [KriteriaController::class, 'index'])->name('kriterias.index');
Route::get('kriterias/{id}', [KriteriaController::class, 'show'])->name('kriterias.show');