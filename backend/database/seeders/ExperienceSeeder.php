<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        // Experience 1: FlexBusiness
        Experience::create([
            'role' => 'Web Developer Intern',
            'company' => 'FlexBusiness',
            'start_date' => '2026-04-01',
            'end_date' => '2026-05-01',
            'summary' => 'Designed and built a standalone User Activity & Audit Log microservice adopted across multiple FlexBusiness products (FlexDok, Wehook), using React.js, Node.js/Express, and MySQL.',
            'highlights' => [
                'Engineered a REST Ingest API secured with API key authentication to receive and persist activity events streamed from several client applications.',
                'Developed a responsive admin dashboard with JWT authentication, including paginated event tables, advanced filters, and application management (registering/deleting apps, viewing API keys).',
            ],
        ]);

        // Experience 2: Codveda
        Experience::create([
            'role' => 'Web Developer Intern',
            'company' => 'Codveda Technologies',
            'start_date' => '2026-03-01',
            'end_date' => '2026-04-01',
            'summary' => 'Delivered 7 full-stack web development projects (static sites, React front ends, and full-stack CRUD applications with JWT authentication) using HTML, CSS, JavaScript, React, Express, and Node.js.',
            'highlights' => [
                'Maintained all project code in version-controlled GitHub repositories with clear documentation for each deliverable.',
            ],
        ]);
    }
}