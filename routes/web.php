<?php

use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\HasilController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PenilaianController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubKriteriaController;
use App\Models\Alternatif;
use App\Models\Hasil;
use App\Models\Kriteria;
use App\Models\Penilaian;
use App\Models\SubKriteria;
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

Route::get('/rekomendasi', function (Request $request) {
    return Inertia::render('Rekomendasi', [
        'subkriterias' => SubKriteria::all()->map(function ($subKriteria){
                return [
                    'id' => $subKriteria->id,
                    'deskripsi' => $subKriteria->deskripsi,
                    'nilai' => $subKriteria->nilai,
                    'kriteria' => $subKriteria->kriteria,
                ];
            }),
        'kriterias' => Kriteria::all()
    ]);
});

Route::get('/perhitungan', function (Request $request) {
    
    $penilaian = new Penilaian;
    $alternatifs = Alternatif::all();
    $kriterias = Kriteria::all();

    $queryKriteriaIds = $request->query('kriteria_id');
    $queryAlternatifId = $request->query('alternatif_id');
    $queryNilaiValues = $request->query('nilai');

    // Create a mapping of alternative IDs to their names
    $alternatifNames = [];
    foreach ($alternatifs as $alternatif) {
        $alternatifNames[$alternatif->id] = $alternatif->nama; // Assuming 'name' is the field containing the name
    }

    $matriks_x = [];
    foreach ($alternatifs as $alternatif) {
        foreach ($kriterias as $kriteria) {
            $alternatif_id = $alternatif->id;
            $kriteria_id = $kriteria->id;

            $data_nilai = $penilaian->data_nilai($alternatif_id, $kriteria_id);
            if (!empty($data_nilai->nilai)) {
                $nilai = $data_nilai->nilai;
            } else {
                $nilai = 0;
            }

            $matriks_x[$kriteria_id][$alternatif_id] = $nilai;
        }
    }

    foreach ($queryKriteriaIds as $index => $kriteria_id) {
        $nilai = $queryNilaiValues[$index];
        $matriks_x[$kriteria_id][$queryAlternatifId] = $nilai;
    }

    $nilai_u = [];
    foreach ($alternatifs as $alternatif) {
        foreach ($kriterias as $kriteria) {
            $alternatif_id = $alternatif->id;
            $kriteria_id = $kriteria->id;
            $tipe_kriteria = $kriteria->jenis;

            $x = $matriks_x[$kriteria_id][$alternatif_id];
            $nilai_min = min($matriks_x[$kriteria_id]);
            $nilai_max = max($matriks_x[$kriteria_id]);

            if ($tipe_kriteria == 'Benefit') {
                $u = ($x - $nilai_min) / ($nilai_max - $nilai_min);
            } else {
                $u = ($nilai_max - $x) / ($nilai_max - $nilai_min);
            }

            $nilai_u[$kriteria_id][$alternatif_id] = $u;
        }
    }

    $total_bobot = 0;
    foreach ($kriterias as $kriteria) {
        $total_bobot += $kriteria->bobot;
    }

    $nilai_ub = [];
    $nilai_akhir = [];
    foreach ($alternatifs as $alternatif) {
        $total = 0;
        $alternatif_id = $alternatif->id;
        foreach ($kriterias as $kriteria) {
            $bobot = $kriteria->bobot / $total_bobot;
            $kriteria_id = $kriteria->id;

            $u = $nilai_u[$kriteria_id][$alternatif_id];
            $ub = $bobot * $u;
            $nilai_ub[$kriteria_id][$alternatif_id] = $ub;
            $total += $ub;
        }

        // Use the name of the alternative instead of the ID
        if ($alternatif_id != $queryAlternatifId) {
            $nilai_akhir[$alternatifNames[$alternatif_id]] = $total;
        }
    }

    return Inertia::render('Rekomendasi', [
        'nilai_akhir' => $nilai_akhir,
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
