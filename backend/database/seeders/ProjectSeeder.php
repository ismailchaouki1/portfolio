<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'User Activity & Audit Log Microservice',
            'summary' => 'Standalone microservice giving FlexBusiness centralized visibility into user activity across FlexDok and Wehook.',
            'description' => 'A decoupled, standalone microservice giving the FlexBusiness team centralized visibility into user activity across separate products (FlexDok, Wehook), without coupling to either codebase. Features: REST Ingest API with API key authentication, responsive admin dashboard, paginated and filterable event tables, and event detail views.',
            'year' => null,
            'stack' => ['React.js', 'Node.js/Express', 'MySQL', 'JWT'],
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'SaaS Driving School Management Platform',
            'summary' => 'Personal SaaS project (in active development) for managing students, instructors, scheduling and payments at driving schools.',
            'description' => 'Personal SaaS project exploring multi-role platform architecture. Features: JWT-based authentication, student/instructor management, session scheduling, and payment handling.',
            'year' => null,
            'stack' => ['React.js', 'Laravel', 'MySQL', 'JWT'],
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'Weather App & Prayer Times App',
            'summary' => 'Material UI app with city-based weather search and localized prayer times.',
            'description' => 'A Material UI interface with dynamic city-based weather search and localized prayer time calculation, consuming third-party REST APIs via Axios with client-side handling for location-based data.',
            'year' => null,
            'stack' => ['React.js', 'Material UI', 'Axios', 'REST API'],
            'is_featured' => false,
        ]);
    }
}
