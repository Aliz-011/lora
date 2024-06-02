<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alternatif extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];

    public function hasil(){
        return $this->belongsTo(Hasil::class);
    }

    public function penilaians() {
        return $this->hasMany(Penilaian::class);
    }
}
