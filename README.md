# Kalyan Manna Portfolio

A modern personal portfolio website built to showcase my work, skills, projects, and digital presence as a full-stack developer and freelancer.

This portfolio includes a smooth landing experience, animated sections, case studies, guestbook/feedback features, contact links, and supporting pages like Blog, Uses, Bucket List, and Attribution.

## Overview

This project is my personal developer portfolio, designed with a strong focus on visual polish, responsiveness, animations, and real-world functionality.

The goal of this portfolio is to present my work professionally to potential clients, recruiters, collaborators, and businesses looking for web development, app development, and digital presence solutions.

## Features

* Modern responsive UI
* Animated hero and about section
* Smooth scroll-based transitions
* Work and case study showcase
* Guestbook / feedback section
* Dynamic backend-powered data
* Clerk authentication integration
* PostgreSQL database support
* Contact and social links page
* Footer with animated visual background
* Clean routing structure
* SEO-ready structure
* Mobile-first improvements

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* shadcn/ui
* React Router

### Backend

* Node.js
* Express.js
* TypeScript
* Drizzle ORM
* Neon PostgreSQL
* Clerk Authentication

### Deployment

* Vercel for frontend
* Render for backend
* Neon for database

## Pages

* `/` — Home page
* `/about` — About page
* `/work` — Work / case studies
* `/blog` — Blog page
* `/more/guestbook` — Guestbook
* `/more/bucket-list` — Bucket List
* `/more/links` — Contact links
* `/more/uses` — Uses page
* `/more/attribution` — Attribution page
* `/sign-in` — Sign in page
* `/sign-up` — Sign up page

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Kalyan-github-4/Kalyan-Manna-Portfolio.git
cd Kalyan-Manna-Portfolio
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

### Client `.env`

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Server `.env`

Create a `.env` file inside the `server` folder.

```env
PORT=5000
DATABASE_URL=your_neon_postgres_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
ALLOWED_ORIGINS=http://localhost:5173
```

For production, update `ALLOWED_ORIGINS` with your deployed frontend URL.

## Running Locally

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend should run at:

```txt
http://localhost:5173
```

The backend should run at:

```txt
http://localhost:5000
```

## Database Commands

Run these inside the `server` folder.

### Generate migrations

```bash
npm run db:generate
```

### Run migrations

```bash
npm run db:migrate
```

### Open Drizzle Studio

```bash
npm run db:studio
```

## Deployment Notes

### Frontend

The frontend can be deployed on Vercel.

Make sure to add the following environment variables in the Vercel dashboard:

```env
VITE_API_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend

The backend can be deployed on Render.

Make sure to add the following environment variables in the Render dashboard:

```env
PORT=5000
DATABASE_URL=your_neon_postgres_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
ALLOWED_ORIGINS=your_frontend_url
```

## Main Sections

### Hero

The landing section introduces me as a developer and freelancer with animated text, CTA buttons, and a profile visual.

### About

The about section uses scroll-based animations to reveal personal introduction and technical skills.

### Work

The work section highlights selected projects and case studies with visual previews and technology tags.

### Guestbook

Visitors can leave feedback or thoughts. Authentication is handled through Clerk, and entries are stored in the database.

### Footer

The footer includes brand information, navigation links, social links, and a polished animated background.

## Future Improvements

* Improve SEO metadata
* Add dynamic blog content
* Add project detail pages
* Improve accessibility
* Add sitemap and robots.txt
* Add better Open Graph preview support
* Add analytics
* Improve mobile responsiveness further
* Add admin controls for guestbook entries

## Author

**Kalyan Manna**

Full-stack developer and freelancer based in Kharagpur, India.

* GitHub: [Kalyan-github-4](https://github.com/Kalyan-github-4)
* Email: [kalyanmanna439@gmail.com](mailto:kalyanmanna439@gmail.com)

## License

This project is currently for personal portfolio use.

If you want to use parts of the design or structure, please give proper credit.
