# CMS T&M Website (Next.js + Node backend)

A single-repo setup for CMS T&M:
- **Frontend:** Next.js 14 (App Router, Tailwind) on port **3000**
- **Backend:** Node + Express + SQLite (`better-sqlite3`) + JWT on port **4000**
- Blog feature: public listing + detail pages plus an authenticated admin for **blog create / edit / delete**.

## Run locally

```bash
cd /Users/marshalsoft/Desktop/doc
cp .env.example .env
npm install
npm run dev
```

- Open the site: http://localhost:3000
- Blog listing: http://localhost:3000/blog
- Admin (login): http://localhost:3000/admin
- After login → dashboard: http://localhost:3000/admin/dashboard
- API health: http://localhost:4000/api/health

## Default admin login

Default values are seeded on first API boot from `.env` / `.env.example`:

- Email: `admin@cmstnm.com`
- Password: `admin123`

Change these values by editing `.env` and restarting `npm run dev`.
The SQLite DB is written to `data/app.db`.

## What's implemented

### Next.js pages (App Router)
- `/` — home hero, stats, pillars, CTA
- `/products`, `/about`, `/routes`, `/leadership`
- `/blog` — public list (featured card + grid) with live data from backend
- `/blog/[slug]` — public story page with cover + body HTML (ISR, revalidate 60s)
- `/admin` — login
- `/admin/dashboard` — blog CRUD: create / edit / delete / publish toggle

### Backend (Node/Express)
- `/api/auth/login` → JWT token
- `/api/auth/me` → verify session
- `/api/blogs` (public GET)
- `/api/blogs` + auth POST → create blog
- `/api/blogs/:id` + auth PUT / DELETE
- `/api/blogs/by-slug/:slug` public blog detail
- SQLite schema for `users` + `blogs` with auto-seeded admin + 3 sample posts

### Existing assets / original site
The original static site files are preserved in this folder:
- `index.html`, `js/`, `bundler/`, `images/`, `favicon.ico`

You can still host them as a legacy static site separately, or remove them later once Next.js is deployed.

## Deploying (VPS / CloudPanel)

### Next.js build
```bash
npm ci
npm run build
# then run:
npm run start
```

### Backend (same box)
```bash
cp .env.example .env
node backend/server.js
```

Use PM2 for long running processes:
```bash
npm i -g pm2
pm2 start "node backend/server.js" --name cms-tm-api
pm2 start "npm run start" --name cms-tm-web
pm2 save
```

Point CloudPanel / Nginx at:
- Frontend → `http://127.0.0.1:3000`
- Backend → (optional) `/api/*` can be proxied to `http://127.0.0.1:4000` or let Next.js handle rewrites via `next.config.js`.
