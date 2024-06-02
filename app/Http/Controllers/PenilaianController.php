<?php

namespace App\Http\Controllers;

use App\Http\Resources\PenilaianResource;
use App\Models\Penilaian;
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
            'penilaians' => PenilaianResource::collection(Penilaian::with(['alternatif', 'kriteria'])->get()),
            'create_url' => route('penilaians.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Penilaian/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alternatif_id' => $request->alternatif_id,
            'kriteria_id' => $request->kriteria_id,
            'nilai' => $request->nilai
        ]);

        Penilaian::create($validated);

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
