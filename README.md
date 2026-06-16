# Mohamed Barre Portfolio

Portfolio website — **frontend** + **backend** (Next.js), database **PostgreSQL (Neon)**.

## Qaabka Mashruuca

```
Mypotpholiyo/
├── frontend/     # Website UI — port 3000
├── backend/      # API + Database — port 3001
├── DEPLOY.md     # GitHub + Vercel deploy guide
└── README.md
```

## Deploy (GitHub + Vercel)

**Eeg [DEPLOY.md](./DEPLOY.md)** — tilmaamo buuxa oo GitHub iyo Vercel ah.

Gaaban:
1. Push code GitHub
2. Vercel: deploy `backend/` (DATABASE_URL, JWT_SECRET, FRONTEND_URL)
3. Vercel: deploy `frontend/` (BACKEND_URL = backend Vercel URL)

## Local Development

### 1. Neon PostgreSQL

1. [neon.tech](https://neon.tech) → abuur project
2. Copy `DATABASE_URL`
3. Ku dar `backend/.env.local` (eeg `backend/.env.example`)

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

`http://localhost:3001`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

`http://localhost:3000`

## Admin Dashboard

- URL: `/login`
- Username: `ENGbarre` ama `Barre@gmail.com`
- Password: `Barre@55`

| Tab | Shaqada |
|-----|---------|
| **Messages** | Arag & tirtir fariimaha contact form-ka |
| **Websites** | Ku dar, beddel, tirtir projects |
| **Images** | Maamul sawirrada website-ka |

## API Endpoints

| Method | Endpoint | Sharaxaad |
|--------|----------|-----------|
| GET | `/api/projects` | Liiska projects |
| GET | `/api/images` | Liiska images |
| POST | `/api/contact` | Dir fariin |
| GET/DELETE | `/api/messages` | Fariimaha (admin) |
| POST/PUT/DELETE | `/api/projects` | Projects CRUD (admin) |
| POST/PUT/DELETE | `/api/images` | Images CRUD (admin) |
| POST | `/api/auth/login` | Admin login |

**MUHIIM:** Website-ka fur `localhost:3000` (frontend), maaha `localhost:3001`.
