# Personal Developer Portfolio

A full-stack personal portfolio with a React + Vite frontend and a Laravel 13 backend.

## Stack

**Frontend:** React 18, Vite 5, JavaScript (no TypeScript), CSS modules, GSAP animations

**Backend:** Laravel 13, PHP 8.4, MySQL, Sanctum JWT authentication

## Prerequisites

- PHP 8.4+
- Composer
- Node.js 20+ and npm
- MySQL or SQLite

## Setup

### Backend

```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables (.env)

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=

# Laravel Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost

# API Configuration
API_BASE_URL=http://localhost:8000
```

## API Endpoints

### Public (no authentication required)

- `GET /skills` — List all skills
- `GET /health` — Health check

### Protected (Sanctum authentication required)

- `GET /api/projects` — List projects
- `GET /api/experiences` — List experiences
- `GET /api/education` — List education
- `POST /api/contact` — Send contact message (validation, honeypot, rate limit: 5/min)

### Auth

- `POST /login` — Login
- `POST /register` — Register
- `POST /logout` — Logout