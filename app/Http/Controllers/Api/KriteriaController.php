<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kriteria;
use Illuminate\Http\Request;

class KriteriaController extends Controller
{
    public function index() {
        return Kriteria::all();
    }

    public function show(int $id) {
        return Kriteria::findOrFail($id);
    }
}
