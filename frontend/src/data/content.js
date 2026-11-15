// Portfolio content.
// Data populated from the user's real resume — no invented values

export const personal = {
  name: 'Ismail Chaouki',
  role: 'Full Stack Web Developer',
  location: 'Tinghir, Morocco',
  email: 'ismailchaouki111@gmail.com',
  phone: null,
  github: 'https://github.com/ismailchaouki1',
  linkedin: 'https://linkedin.com/in/ismail-chaouki',
  summary:
    'Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL. Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped 7 projects end-to-end. I care about clean data models, small bundles and interfaces that actually get used.',
};

export const skills = [
  // Languages (no level)
  { category: 'Languages', items: ['JavaScript (ES6+)', 'PHP', 'Python'] },
  // Frontend
  {
    category: 'Frontend',
    items: [
      'React.js',
      'HTML5',
      'CSS3',
      'SASS',
      'Bootstrap',
      'Material UI',
      'Chakra UI',
      'GSAP',
      'React Three Fiber',
    ],
  },
  // Backend
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Laravel', 'REST APIs', 'JWT Authentication'],
  },
  // Databases
  { category: 'Databases', items: ['MySQL', 'MongoDB', 'Firebase'] },
  // Tools & Platforms
  {
    category: 'Tools & Platforms',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Postman',
      'Vercel',
      'Netlify',
      'XAMPP',
      'Apache',
      'Laragon',
    ],
  },
  // Design
  { category: 'Design', items: ['Figma', 'Adobe XD', 'Canva'] },
  // Methodologies
  { category: 'Methodologies', items: ['Agile', 'Scrum', 'Clean Code', 'MVC'] },
];

export const certifications = [
  { name: 'HTML Fundamentals', year: '' },
  { name: 'CSS Fundamentals', year: '' },
  { name: 'Introduction to PHP', year: '' },
  { name: 'JavaScript for Beginners', year: '' },
];

export const languages = [
  { name: 'Tamazight', spoken: 'Native' },
  { name: 'Arabic', spoken: 'Full Professional' },
  { name: 'English', spoken: 'Full Professional' },
  { name: 'French', spoken: 'Limited Working' },
];

export const experience = [
  {
    id: 'flexbusiness',
    company: 'FlexBusiness',
    role: 'Web Developer Intern',
    start: '2026-04-01',
    end: '2026-05-01',
    bullets: [
      'Designed and built a standalone User Activity & Audit Log microservice adopted across multiple FlexBusiness products (FlexDok, Wehook), using React.js, Node.js/Express, and MySQL.',
      'Engineered a REST Ingest API secured with API key authentication to receive and persist activity events streamed from several client applications.',
      'Developed a responsive admin dashboard with JWT authentication, including paginated event tables, advanced filters, and application management (registering/deleting apps, viewing API keys).',
    ],
  },
  {
    id: 'codveda',
    company: 'Codveda Technologies',
    role: 'Web Developer Intern',
    start: '2026-03-01',
    end: '2026-04-01',
    bullets: [
      'Delivered 7 full-stack web development projects (static sites, React front ends, and full-stack CRUD applications with JWT authentication) using HTML, CSS, JavaScript, React, Express, and Node.js.',
      'Maintained all project code in version-controlled GitHub repositories with clear documentation for each deliverable.',
    ],
  },
];

export const education = [
  {
    id: 'ofppt',
    school: 'OFPPT',
    degree: 'Technicien Spécialisé, Développement Digital, Full Stack Web',
    year: '2024 – 2026',
    detail:
      'Intensive full-stack curriculum: HTML5, CSS3, JavaScript, React.js, Laravel, Express.js, PHP, MySQL, MongoDB, Python, REST APIs.',
  },
  {
    id: 'lycee',
    school: 'Lycée Technique Mohamed VI',
    degree: 'Baccalauréat, Sciences Physiques',
    year: '2023 – 2024',
  },
];

export const projects = [
  {
    id: 'audit-log-microservice',
    name: 'User Activity & Audit Log Microservice',
    year: '2026',
    stack: ['React.js', 'Node.js/Express', 'MySQL', 'JWT'],
    description:
      'A decoupled, standalone microservice giving the FlexBusiness team centralized visibility into user activity across separate products (FlexDok, Wehook), without coupling to either codebase. Features: REST Ingest API with API key authentication, responsive admin dashboard, paginated and filterable event tables, event detail views.',
  },
  {
    id: 'driving-school',
    name: 'SaaS Driving School Management Platform',
    year: '2026',
    stack: ['React.js', 'Laravel', 'MySQL', 'JWT'],
    description:
      'Personal SaaS project (in active development) exploring multi-role platform architecture for managing students, instructors, scheduling, and payments at driving schools. Features: JWT-based authentication, student/instructor management, session scheduling, payment handling.',
  },
  {
    id: 'weather-app',
    name: 'Weather App & Prayer Times App',
    year: '2026',
    stack: ['React.js', 'Material UI', 'Axios', 'REST API'],
    description:
      'A Material UI interface with dynamic city-based weather search and localized prayer time calculation, consuming third-party REST APIs via Axios with client-side handling for location-based data.',
  },
];

// No separate content.js fields for honeypot, rate limit, or CORS — those are backend concerns.