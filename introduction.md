# Instant Share Portfolio

> Build a professional portfolio. Get a code. Share it anywhere — instantly.

---

## What Is This Project?

**Instant Share Portfolio** is a full-stack SaaS web application that lets anyone create a polished, professional portfolio page in minutes — no hosting, no domain, no coding required. After filling out a guided multi-step form, the system generates a unique 8-character code (e.g., `a3f9c21b`) and a shareable public URL like:

```
https://instant-share-portfolio.vercel.app/p/a3f9c21b
```

That link works for anyone, anywhere, forever — until the owner deletes it.

The platform targets developers, designers, freelancers, and anyone who needs to present their work quickly. It solves a real, recurring pain point: most portfolio tools are either too complex (requiring hosting knowledge) or too rigid (no customization). Instant Share Portfolio sits in the middle — structured but flexible, guided but expressive.

---

## Core Idea

The name says it all. Three steps:

1. **Fill** — a guided 8-step wizard collects your name, bio, skills, projects, services, social links, and preferred visual template.
2. **Generate** — the system creates a portfolio record in the database and issues a unique short code.
3. **Share** — copy the link and paste it in a job application, LinkedIn bio, email signature, or anywhere else.

No account required to view. An account is needed only to create and manage your portfolio.

---

## What It Delivers

### For End Users

| Feature | Detail |
|---|---|
| Guided portfolio builder | 8-step wizard with live validation |
| Profile & resume upload | JPG/PNG/WEBP images up to 5 MB; PDF resumes up to 10 MB |
| Project showcase | Add multiple projects with descriptions, tech stack, live/repo links, and screenshots |
| Skills section | List skills with proficiency levels: Beginner, Intermediate, Advanced, Expert |
| Services section | Describe services offered with optional price ranges |
| Social links | GitHub, LinkedIn, Twitter/X, Behance, Dribbble, Instagram, personal website |
| 3 portfolio templates | Editorial, Creative, Professional — chosen at publish time |
| Instant shareable link | 8-character hex code, collision-safe, no login required to view |
| View counter | Portfolio owners can see how many times their page was visited |
| Portfolio management | Update content, change templates, or soft-delete at any time |
| Dark mode | Full dark/light theme toggle with localStorage persistence |

### For Developers (this codebase)

- Clean separation of frontend and backend concerns
- Typed throughout (TypeScript on the frontend, JSDoc-style patterns on the backend)
- Consistent REST API with predictable JSON responses
- Atomic database transactions for portfolio creation
- Stream-based file uploads (no temp disk writes — works on ephemeral file systems like Render)
- Database schema with proper indexes and auto-updating `updated_at` triggers
- Rate limiting, input validation, and security headers built in

---

## Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Validation | React Hook Form + Zod |
| Animation | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

### Backend

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js 4 |
| Database | PostgreSQL (via `pg` driver) |
| Auth | JWT (jsonwebtoken) — 7-day expiry |
| Password Hashing | bcryptjs (12 salt rounds) |
| File Upload | Multer (memory storage) |
| Cloud Storage | Cloudinary v2 (images & PDFs) |
| Security | Helmet, CORS, express-rate-limit |
| Deployment | Render.com |

### Infrastructure

| Service | Purpose |
|---|---|
| Vercel | Frontend hosting + CDN |
| Render.com | Backend API hosting |
| Render PostgreSQL | Managed database (or local PostgreSQL) |
| Cloudinary | Image/PDF CDN and transformation |

---

## Application Architecture

```
Browser (Next.js)
       │
       │  HTTPS REST API calls
       ▼
Express.js API Server
  ├── Auth Middleware (JWT)
  ├── Rate Limiters
  ├── Input Validators
  ├── Controllers
  │     ├── auth.controller    → users table
  │     ├── portfolio.controller → portfolios, projects, skills, services, social_links tables
  │     └── upload.controller  → Cloudinary CDN
  └── Error Handler
       │
       ▼
  PostgreSQL Database (6 tables)
  Cloudinary CDN (images + PDFs)
```

---

## Database Schema

Six tables, all linked by UUID foreign keys with cascade deletes:

| Table | Purpose |
|---|---|
| `users` | User accounts (email, hashed password, name) |
| `portfolios` | Core portfolio record (code, template, bio, views, owner) |
| `projects` | Projects listed on a portfolio |
| `project_images` | Images for each project |
| `skills` | Skills with proficiency levels |
| `services` | Services offered with optional pricing |
| `social_links` | Platform + URL pairs per portfolio |

Auto-updating `updated_at` trigger is set on the `portfolios` table. The `code` column has a unique index and is generated with collision detection (up to 5 retries).

---

## API Endpoints

### Authentication

```
POST  /api/auth/signup     Register a new user
POST  /api/auth/login      Log in, receive JWT
GET   /api/auth/me         Get current user (requires token)
```

### Portfolio

```
POST  /api/portfolio        Create portfolio (rate-limited: 10/hour per user)
GET   /api/portfolio/:code  Fetch public portfolio by code (increments view count)
PUT   /api/portfolio/:code  Update portfolio (auth required, owner only)
DELETE /api/portfolio/:code Soft-delete portfolio (auth required, owner only)
```

### File Upload

```
POST  /api/upload/image    Upload profile or project image (auth required)
POST  /api/upload/resume   Upload PDF resume (auth required)
```

### Health

```
GET   /health              Returns 200 OK — used by Render to keep service alive
```

All responses follow a consistent envelope:

```json
{ "success": true, "data": { ... } }
{ "success": false, "error": "Human-readable message" }
```

---

## Project Structure

```
repo/
├── backend/
│   ├── server.js                  Entry point
│   ├── package.json
│   ├── .env.example               Environment variable template
│   ├── scripts/
│   │   └── db-init.js             Runs schema.sql to set up the database
│   └── src/
│       ├── app.js                 Express app, middleware, routes
│       ├── config/
│       │   ├── db.js              PostgreSQL connection pool
│       │   └── cloudinary.js      Cloudinary + Multer configuration
│       ├── middleware/
│       │   ├── auth.js            JWT verification middleware
│       │   ├── validate.js        Input validation middleware
│       │   ├── rateLimit.js       Rate limiter instances
│       │   └── errorHandler.js    Global error handler
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── portfolio.routes.js
│       │   └── upload.routes.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── portfolio.controller.js
│       │   └── upload.controller.js
│       └── db/
│           └── schema.sql         Full PostgreSQL schema
│
├── frontend/
│   ├── package.json
│   ├── next.config.ts             Allows Cloudinary image domains
│   ├── tailwind.config.ts
│   └── src/
│       ├── app/
│       │   ├── page.tsx           Landing page
│       │   ├── create/page.tsx    Portfolio builder (wizard)
│       │   ├── created/[code]/page.tsx   Success page after publish
│       │   ├── p/[code]/page.tsx  Public portfolio view
│       │   ├── layout.tsx         Root layout + metadata
│       │   └── not-found.tsx      Custom 404
│       ├── components/
│       │   ├── builder-wizard.tsx      8-step form wizard
│       │   ├── builder-sections.tsx    Individual step components
│       │   ├── portfolio-renderer.tsx  Routes to correct template
│       │   ├── site-header.tsx         Navigation bar
│       │   ├── theme-toggle.tsx        Dark/light toggle
│       │   ├── ui.tsx                  Reusable UI primitives
│       │   └── templates/
│       │       ├── template-editorial.tsx
│       │       ├── template-creative.tsx
│       │       └── template-professional.tsx
│       └── lib/
│           ├── api.ts             All API call functions
│           ├── types.ts           TypeScript interfaces
│           ├── schemas.ts         Zod validation schemas
│           ├── constants.ts       App-wide constants
│           └── utils.ts           Helper functions
│
├── introduction.md                This file
└── readme.md                      Deployment & setup guide
```

---

## Security

| Concern | Approach |
|---|---|
| Authentication | JWT, 7-day expiry, verified on every protected route |
| Passwords | bcryptjs with 12 salt rounds |
| Rate limiting | 100 req/15 min globally; 20 auth/15 min; 10 portfolios/hour |
| SQL injection | Parameterized queries throughout |
| File validation | Type (MIME) and size checked before upload |
| HTTP headers | Helmet sets security headers (CSP, HSTS, etc.) |
| CORS | Configured to allow only the registered frontend origin |
| Input validation | Zod on the frontend; Express validators on the backend |
| Soft deletes | Deleted portfolios are hidden (`is_active = false`), not destroyed |
| Error messages | Stack traces hidden in production; generic messages returned |

---

## Portfolio Templates

Three templates ship with the platform. All three render the same underlying data — the choice is purely visual.

| Template | Character |
|---|---|
| **Editorial** | Clean, typographic, minimal whitespace — suited to writers and developers |
| **Creative** | Bold colors, asymmetric layout — suited to designers and artists |
| **Professional** | Corporate, structured, sidebar layout — suited to consultants and managers |

Templates are selected at the end of the builder wizard and can be changed later by updating the portfolio.

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally
- Cloudinary account (free tier works)

### Backend

```bash
cd backend
cp .env.example .env        # Fill in your database URL, Cloudinary keys, JWT secret
npm install
npm run db:init             # Creates tables and indexes
npm run dev                 # Starts with nodemon on port 4000
```

### Frontend

```bash
cd frontend
cp .env.example .env.local  # Set NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
npm install
npm run dev                 # Starts on port 3000
```

Open `http://localhost:3000` to use the app locally.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 4000) |
| `NODE_ENV` | `development` or `production` |
| `DATABASE_URL` | PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `JWT_SECRET` | Long random secret for signing tokens |
| `FRONTEND_URL` | Allowed CORS origin (your Vercel URL in prod) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |

---

## Key Design Decisions

**Why Express over a more opinionated framework?**
Express gives maximum control over middleware ordering and error handling without imposing conventions that would complicate a relatively straightforward REST API.

**Why PostgreSQL over MongoDB?**
Portfolio data is relational — projects belong to portfolios, images belong to projects, skills belong to portfolios. A relational schema with foreign keys and cascade deletes is cleaner and less error-prone than embedding nested documents.

**Why Cloudinary over S3?**
Cloudinary handles image transformation, optimization, and delivery automatically. Uploading directly from a Node.js stream to Cloudinary avoids temp file writes, which matters on Render's ephemeral filesystem.

**Why soft deletes?**
Preserving deleted records prevents broken links from being immediately visible and provides an audit trail. If a user accidentally deletes a portfolio, recovery is possible without a backup restore.

**Why an 8-character hex code over sequential IDs?**
Short codes are human-readable, shareable, and don't reveal the number of portfolios in the system. Collision probability at current scale is negligible, and the code generation retries up to 5 times if a collision does occur.

---

## Team & Context

This project was developed as a **Software Engineering** course project in Semester 8. It demonstrates real-world software engineering practices including:

- Requirements gathering and feature scoping
- Layered architecture (presentation → API → data)
- API design and documentation
- Security-aware development
- Cloud deployment with CI/CD via Vercel and Render

---

*Built with Next.js, Express, PostgreSQL, and Cloudinary.*
