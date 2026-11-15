<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            'Languages' => ['JavaScript (ES6+)', 'PHP', 'Python'],
            'Frontend' => ['React.js', 'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Material UI', 'Chakra UI', 'GSAP', 'React Three Fiber'],
            'Backend' => ['Node.js', 'Express.js', 'Laravel', 'REST APIs', 'JWT Authentication'],
            'Databases' => ['MySQL', 'MongoDB', 'Firebase'],
            'Tools & Platforms' => ['Git', 'GitHub', 'GitLab', 'Postman', 'Vercel', 'Netlify', 'XAMPP', 'Apache', 'Laragon'],
            'Design' => ['Figma', 'Adobe XD', 'Canva'],
            'Methodologies' => ['Agile', 'Scrum', 'Clean Code', 'MVC'],
        ];

        foreach ($skills as $category => $names) {
            foreach ($names as $name) {
                Skill::create(['name' => $name, 'category' => $category]);
            }
        }
    }
}
