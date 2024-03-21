<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menambahkan data fakultas secara manual
        DB::table('faculty')->insert([
            'faculty_id' => '1',
            'faculty_name' => 'Fakultas Sains Teknologi',
            'abbreviation' => 'FST',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '2',
            'faculty_name' => 'Fakultas Ilmu Sosial dan Ilmu Politik',
            'abbreviation' => 'FISIP',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '3',
            'faculty_name' => 'Fakultas Ekonomi dan Bisnis',
            'abbreviation' => 'FEB',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '4',
            'faculty_name' => 'Fakultas Hukum',
            'abbreviation' => 'FH',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '5',
            'faculty_name' => 'Fakultas Psikologi',
            'abbreviation' => 'FPsi',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '6',
            'faculty_name' => 'Fakultas Peternakan',
            'abbreviation' => 'FAPET',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '7',
            'faculty_name' => 'Kedokteran',
            'abbreviation' => 'FK',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '8',
            'faculty_name' => 'Fakultas Pertaninan',
            'abbreviation' => 'FP',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '9',
            'faculty_name' => 'Fakultas Ilmu Budaya',
            'abbreviation' => 'FIB',
        ]);

        DB::table('faculty')->insert([
            'faculty_id' => '10',
            'faculty_name' => 'Fakultas Ilmu Komunikasi',
            'abbreviation' => 'Fikom',
        ]);

    }
}
