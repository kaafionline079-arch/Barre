# Mohamed Barre Portfolio

Professional portfolio website — Next.js, PostgreSQL (Neon), Admin Dashboard.

## Project structure

```
Barre/
├── frontend/          ← Main app (website + API + database)
│   ├── app/           ← Pages & API routes (/api/*)
│   ├── components/    ← UI components
│   ├── lib/server/    ← Database & auth (server only)
│   └── public/        ← Images & assets
├── backend/           ← Local dev reference (optional)
├── vercel.json        ← Build config (root deploy)
├── vercel.env         ← Upload to Vercel (NOT in Git — secrets)
└── GITHUB_VERCEL_SETUP.md
```

## Quick deploy

**Full guide:** [GITHUB_VERCEL_SETUP.md](./GITHUB_VERCEL_SETUP.md)

1. Push code to GitHub (`kaafionline079-arch/Barre`)
2. Vercel → Import repo → Root Directory: **`frontend`**
3. Import `vercel.env` → Deploy

## Admin login

- URL: `/login`
- Username: `ENGbarre` or `Barre@gmail.com`
- Password: `Barre@55`

## Local development

```powershell
cd frontend
npm install
# Copy .env.example to .env.local and add DATABASE_URL + JWT_SECRET
npm run dev
```

Open: `http://localhost:3000`

## Health check

`GET /api/health` — confirms Neon database connection.
