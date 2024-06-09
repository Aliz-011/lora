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

    public function data_nilai($id_alternatif, $id_kriteria) {
        return $this->join('sub_kriterias', 'penilaians.nilai', '=', 'sub_kriterias.id')
            ->select("sub_kriterias.nilai as nilai", "penilaians.id as id", "penilaians.kriteria_id as kriteria_id", "penilaians.alternatif_id as alternatif_id")
            ->where('penilaians.alternatif_id', '=', $id_alternatif)
            ->where('penilaians.kriteria_id','=', $id_kriteria)
            ->first();
    }
}
