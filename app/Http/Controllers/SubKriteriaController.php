<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use App\Models\SubKriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubKriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('SubKriteria/Home', [
            'subkriterias' => SubKriteria::all()->map(function ($subKriteria){
                return [
                    'id' => $subKriteria->id,
                    'deskripsi' => $subKriteria->deskripsi,
                    'nilai' => $subKriteria->nilai,
                    'kriteria' => $subKriteria->kriteria,
                    'edit_url' => route('subkriterias.edit', $subKriteria),
                ];
            }),
            'create_url' => route('subkriterias.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('SubKriteria/Create', [
            'kriterias' => Kriteria::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kriteria_id' => ['required', 'integer'],
            'nilai' => ['required', 'integer'],
            'deskripsi' => ['required', 'string']
        ]);

        SubKriteria::create($validated);

        return to_route('subkriterias.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubKriteria $subKriteria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubKriteria $subKriteria)
    {
        return Inertia::render('SubKriteria/Edit', [
            'kriterias' => Kriteria::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubKriteria $subKriteria)
    {
        SubKriteria::findOrFail($subKriteria->id);
        $subKriteria->kriteria_id = $subKriteria->kriteria_id;
        $subKriteria->deskripsi = $subKriteria->deskripsi;
        $subKriteria->nilai = $subKriteria->nilai;
        $subKriteria->save();

        return to_route('subkriterias.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubKriteria $subKriteria)
    {
        $data = SubKriteria::findOrFail($subKriteria->id);
        $data->delete();
    }
}
