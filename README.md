Blog Website

A full-stack personal blog built from scratch with Flask and Next.js — write, publish, and manage posts through a password-protected admin panel, with a public site for visitors to read.

Live site: https://blog-website-zlakio1.vercel.app

Stack
Layer	Technology
Frontend	Next.js (React), Tailwind CSS
Backend	Flask (Python)
Database	SQLite + SQLAlchemy ORM
Auth	Flask sessions + bcrypt password hashing
Deployment	Vercel (frontend) · Render (backend)
Features
Public blog homepage with all published posts
Individual post pages with dynamic routing (/blog/[slug])
About page
Password-protected admin panel:
Login (session-based, bcrypt-hashed credentials)
Create new posts
Delete existing posts
Live posts list, updates instantly after publishing
REST API with 7 endpoints (posts CRUD + auth)
Environment-variable-based config for local vs. production
API Endpoints
Method	Endpoint	Description
GET	/api/posts	List all posts
GET	/api/posts/<slug>	Get a single post
POST	/api/posts	Create a post (validates required fields)
PUT	/api/posts/<id>	Update a post
DELETE	/api/posts/<id>	Delete a post
POST	/api/auth/login	Admin login
POST	/api/auth/logout	Admin logout
Project Structure
blog_website/
├── backend/
│   ├── app.py          # Flask entry point, config, CORS
│   ├── extensions.py   # SQLAlchemy db instance
│   ├── models.py       # Post and Admin models
│   ├── routes.py       # API endpoints (Blueprint)
│   └── requirements.txt
└── frontend/
    └── blog-website/
        ├── app/
        │   ├── page.js              # Home
        │   ├── about/page.js        # About
        │   ├── blog/[slug]/page.js  # Single post
        │   └── admin/page.js        # Admin panel
        └── components/
            └── Navbar.js
Running Locally

Backend

bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
py app.py

Runs on http://localhost:5000

Frontend

bash
cd frontend/blog-website
npm install
npm run dev

Runs on http://localhost:3000

Environment variables — create frontend/blog-website/.env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000

And on the backend, a .env with:

FRONTEND_URL=http://localhost:3000
Known Limitations
Database is not persistent in production. Render's free tier uses an ephemeral filesystem, so the SQLite database resets when the backend restarts/spins down from inactivity. Posts created live will not survive indefinitely. Migrating to a persistent database (e.g. Render PostgreSQL) is the planned fix.
Single-admin only — no multi-user support yet