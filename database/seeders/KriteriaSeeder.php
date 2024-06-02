<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kriteria::create([
            'keterangan' => 'Pinjaman',
            'kode_kriteria' => 'C1',
            'bobot' => 20,
            'jenis' => 'Cost'
        ]);
        Kriteria::create([
            'keterangan' => 'Angsuran',
            'kode_kriteria' => 'C2',
            'bobot' => 10,
            'jenis' => 'Cost'
        ]);
        Kriteria::create([
            'keterangan' => 'Jaminan',
            'kode_kriteria' => 'C3',
            'bobot' => 20,
            'jenis' => 'Benefit'
        ]);
        Kriteria::create([
            'keterangan' => 'Status',
            'kode_kriteria' => 'C4',
            'bobot' => 70,
            'jenis' => 'Benefit'
        ]);
    }
}
