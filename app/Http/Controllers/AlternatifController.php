<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use App\Models\Alternatif;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlternatifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Alternatif/Home', [
            'alternatifs' => Alternatif::all()->map(function ($alternatif) {
                return [
                    'id' => $alternatif->id,
                    'nama' => $alternatif->nama,
                    'edit_url' => route('alternatifs.edit', $alternatif)
                ];
            }),
            'create_url' => route('alternatifs.create'),]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Alternatif/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'min:1', 'unique:alternatifs']
        ]);

        Alternatif::create($validated);

        return redirect()->route('alternatifs')->with('success', 'Alternatif created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alternatif $alternatif)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alternatif $alternatif)
    {
        return Inertia::render('Alternatif/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alternatif $alternatif)
    {
        Alternatif::updateOrCreate(
            ['nama' => $alternatif->nama],
            ['nama' => $request->nama]
        );

        return to_route('alternatifs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternatif $alternatif)
    {
        $data = Alternatif::findOrFail($alternatif->id);
        $data->delete();
    }
}
