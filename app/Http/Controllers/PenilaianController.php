<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Models\Kriteria;
use App\Models\Penilaian;
use App\Models\SubKriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenilaianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return Inertia::render('Penilaian/Home', [
            'penilaians' => Penilaian::all(),
            'alternatifs' => Alternatif::all()->map(function ($alternatif) {
                $penilaian = new Penilaian;
                return [
                    'id' => $alternatif->id,
                    'nama' => $alternatif->nama,
                    'sum' => count($penilaian->editUrl($alternatif->id)),
                ];
            }),
            'create_url' => route('penilaians.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Penilaian/Create', [
            'subkriterias' => SubKriteria::all()->map(function ($subKriteria){
                return [
                    'id' => $subKriteria->id,
                    'deskripsi' => $subKriteria->deskripsi,
                    'nilai' => $subKriteria->nilai,
                    'kriteria' => $subKriteria->kriteria,
                ];
            }),
            'alternatifs' => Alternatif::all(),
            'kriterias' => Kriteria::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alternatif_id' => ['integer', 'required'],
            'kriteria_id' => ['array', 'required'],
            'nilai' => ['array', 'required'],
        ]);

        $alternatif_id = $validated['alternatif_id'];
        $kriteria_ids = $validated['kriteria_id'];
        $nilai_values = $validated['nilai'];

        $data = [];

        foreach ($kriteria_ids as $index => $kriteria_id) {
            $data[] = [
                'alternatif_id' => $alternatif_id,
                'kriteria_id' => $kriteria_id,
                'nilai' => $nilai_values[$index]
            ];
        }

        Penilaian::insert($data);

        return to_route('penilaians.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Penilaian $penilaian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penilaian $penilaian)
    {
        return Inertia::render('Penilaian/Edit', [
            'penilaian' => $penilaian
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penilaian $penilaian)
    {
        Penilaian::findOrFail($penilaian->id);
        $penilaian->alternatif_id = $request->alternatif_id;
        $penilaian->kriteria_id = $request->kriteria_id;
        $penilaian->nilai = $request->nilai;

        $penilaian->save();
        return to_route('penilaians.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penilaian $penilaian)
    {
        $penilaian->delete();
    }
}
