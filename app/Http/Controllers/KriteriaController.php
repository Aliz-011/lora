<?php

namespace App\Http\Controllers;

use App\Http\Requests\KriteriaRequest;
use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kriteria/Home', [
            'kriterias' => Kriteria::all()->map(function ($kriteria) {
                return [
                    'id' => $kriteria->id,
                    'keterangan' => $kriteria->keterangan,
                    'kode_kriteria' => $kriteria->kode_kriteria,
                    'bobot' => $kriteria->bobot,
                    'jenis' => $kriteria->jenis,
                    'edit_url' => route('kriterias.edit', $kriteria)
                ];
            }),
            'create_url' => route('kriterias.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kriteria/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KriteriaRequest $request)
    {
        $validated = $request->validated();

        Kriteria::create($validated);

        return to_route('kriterias.index')->with('success', 'Kriteria created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kriteria $kriteria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($kriteria)
    {
        $data = Kriteria::findOrFail($kriteria);
        return Inertia::render('Kriteria/Edit', [
            'kriteria' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($kriteria)
    {
        $data = Kriteria::find($kriteria);
        $data->save();

        return to_route('kriterias.index')->with('success', 'Kriteria updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kriteria $kriteria)
    {
        $data = Kriteria::findOrFail($kriteria->id);
        $data->delete();
    }
}
