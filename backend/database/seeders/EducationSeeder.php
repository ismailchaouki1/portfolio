<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        Education::create([
            'school' => 'OFPPT',
            'degree' => 'Technicien Spécialisé',
            'field' => 'Développement Digital, Full Stack Web',
            'city' => 'Tinghir',
            'start_year' => '2024',
            'end_year' => '2026',
            'details' => 'Intensive full-stack curriculum: HTML5, CSS3, JavaScript, React.js, Laravel, Express.js, PHP, MySQL, MongoDB, Python, REST APIs.',
        ]);

        Education::create([
            'school' => 'Lycée Technique Mohamed VI',
            'degree' => 'Baccalauréat',
            'field' => 'Sciences Physiques',
            'city' => 'Azilal',
            'start_year' => '2023',
            'end_year' => '2024',
        ]);
    }
}
