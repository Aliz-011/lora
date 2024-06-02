<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alternatif;

class AlternatifController extends Controller
{
    public function index() {
        return Alternatif::all();
    }

    public function show(int $id) {
        return Alternatif::findOrFail($id);
    }
}
