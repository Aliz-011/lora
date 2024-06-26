<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    use HasFactory;

    protected $fillable = ['alternatif_id', 'kriteria_id', 'nilai'];
    protected $with = ['alternatif', 'kriteria'];

    public function alternatif() {
        return $this->belongsTo(Alternatif::class);
    }

    public function editUrl($id) {
        return Penilaian::where('alternatif_id', $id)->get();
    }

    public function kriteria() {
        return $this->belongsTo(Kriteria::class);
    }
}
