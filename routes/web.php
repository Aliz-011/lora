<?php

use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\HasilController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PenilaianController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubKriteriaController;
use App\Models\Alternatif;
use App\Models\Hasil;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function (Request $request) {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::group(['middleware' => ['auth', 'role:superadmin|admin']], function () {
    Route::get('/dashboard', function () {
            $id = Auth::id();
            $user = User::findOrFail($id);
            $user->load(['roles', 'permissions']);  
            return Inertia::render('Dashboard', [
                'user' => $user,
                'alternatifs' => Alternatif::all(),
                'hasils' => Hasil::all()
            ]);
    })->name('dashboard');

    Route::resource('alternatifs', AlternatifController::class)->except(['show']);
    Route::resource('kriterias', KriteriaController::class)->except(['show']);
    Route::resource('subkriterias', SubKriteriaController::class)->except(['show']);
    Route::resource('penilaians', PenilaianController::class)->except(['show']);
    Route::resource('hasils', HasilController::class)->except(['show']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
