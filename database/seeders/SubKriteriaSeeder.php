<?php

namespace Database\Seeders;

use App\Models\SubKriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubKriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SubKriteria::create([
            'kriteria_id' => 1,
            'deskripsi' => 'Rp1.000.000',
            'nilai' => 1000000
        ]);
        SubKriteria::create([
            'kriteria_id' => 1,
            'deskripsi' => 'Rp5.000.000',
            'nilai' => 5000000
        ]);
        SubKriteria::create([
            'kriteria_id' => 1,
            'deskripsi' => 'Rp1.200.000',
            'nilai' => 1200000
        ]);
        SubKriteria::create([
            'kriteria_id' => 1,
            'deskripsi' => 'Rp8.000.000',
            'nilai' => 8000000
        ]);
        SubKriteria::create([
            'kriteria_id' => 1,
            'deskripsi' => 'Rp4.000.000',
            'nilai' => 4000000
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '3 x',
            'nilai' => 3
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '4 x',
            'nilai' => 4
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '6 x',
            'nilai' => 6
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '6 x',
            'nilai' => 6
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '10 x',
            'nilai' => 10
        ]);
        SubKriteria::create([
            'kriteria_id' => 2,
            'deskripsi' => '10 x',
            'nilai' => 10
        ]);
        SubKriteria::create([
            'kriteria_id' => 3,
            'deskripsi' => 'BPKB Motor',
            'nilai' => 3
        ]);
        SubKriteria::create([
            'kriteria_id' => 3,
            'deskripsi' => 'BPKB Mobil',
            'nilai' => 5
        ]);
        SubKriteria::create([
            'kriteria_id' => 4,
            'deskripsi' => 'Lancar',
            'nilai' => 5
        ]);
        SubKriteria::create([
            'kriteria_id' => 4,
            'deskripsi' => 'Kurang lancar',
            'nilai' => 3
        ]);
        SubKriteria::create([
            'kriteria_id' => 4,
            'deskripsi' => 'Belum ada',
            'nilai' => 4
        ]);
    }
}
