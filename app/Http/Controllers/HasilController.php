<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Models\Hasil;
use App\Models\Kriteria;
use App\Models\Penilaian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HasilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penilaian = new Penilaian;
        $alternatifs = Alternatif::where('nama', '!=', 'Custom')->get();
        $kriterias = Kriteria::all();

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
            $nilai_akhir[$alternatifNames[$alternatif_id]] = $total;
        }

        return Inertia::render('Hasil/Home', [
            'nilai_akhir' => $nilai_akhir,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Hasil $hasil)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hasil $hasil)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hasil $hasil)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hasil $hasil)
    {
        //
    }
}
