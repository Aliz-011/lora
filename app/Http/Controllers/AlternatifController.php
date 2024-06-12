<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
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
                    'keterangan' => $alternatif->keterangan,
                    'img' => $alternatif->img,
                    'edit_url' => route('alternatifs.edit', $alternatif)
                ];
            }),
            'create_url' => route('alternatifs.create'),
        ]);
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
            'nama' => ['required', 'string', 'min:1', 'unique:alternatifs'],
            'keterangan' => ['string', 'nullable'],
            'img' => ['image'],
        ]);
        
        $image = $validated['img'] ?? null;
        if ($image) {
            $validated['img'] = $image->store('alternatif/' . Str::random(), 'public');
        }

        Alternatif::create($validated);

        return redirect()->route('alternatifs.index')->with('success', 'Alternatif created!');
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
    public function edit($alternatif)
    {
        $data = Alternatif::findOrFail($alternatif);
        return Inertia::render('Alternatif/Edit', [
            'alternatif' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($alternatif)
    {
        $data = Alternatif::findOrFail($alternatif);
        $data->save();

        return to_route('alternatifs.index')->with('success', 'Alternatif updated!');
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
