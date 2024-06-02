<?php

use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PenilaianController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubKriteriaController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ['auth', 'role:superadmin|admin']], function () {
    Route::get('/dashboard', function () {
            $id = Auth::id();
            $user = User::findOrFail($id);
            $user->load(['roles', 'permissions']);  
            return Inertia::render('Dashboard', [
                'user' => $user
            ]);
    })->name('dashboard');

    Route::resource('alternatifs', AlternatifController::class)->except(['show']);
    Route::resource('kriterias', KriteriaController::class)->except(['show']);
    Route::resource('subkriterias', SubKriteriaController::class)->except(['show']);
    Route::resource('penilaians', PenilaianController::class)->except(['show']);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
