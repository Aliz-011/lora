<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hasil extends Model
{
    use HasFactory;

    protected $fillable = ['alternatif_id', 'nilai'];
    protected $with = [];

    public function alternatifs() {
        return $this->hasMany(Alternatif::class);
    }
}
