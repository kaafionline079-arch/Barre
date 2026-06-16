# Deploy: GitHub + Vercel

Portfolio-kan wuxuu leeyahay **2 qaybood** — deploy labadooda Vercel, hal GitHub repo.

```
Mypotpholiyo/
├── frontend/   → Vercel Project 1 (website-ka dadka)
└── backend/    → Vercel Project 2 (API + Neon database)
```

---

## Tallaabada 1 — GitHub

### 1.1 Abuur repo GitHub

1. Tag [github.com/new](https://github.com/new)
2. Magac: tusaale `mohamed-barre-portfolio`
3. **Ha dooran** README (waxaan hore u leenahay)
4. Create repository

### 1.2 Push code-ka

Fur terminal mashruuca gudahiisa:

```powershell
cd C:\Users\hp\Desktop\Mypotpholiyo

git init
git add .
git commit -m "Initial commit: Mohamed Barre portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mohamed-barre-portfolio.git
git push -u origin main
```

> Beddel `YOUR_USERNAME` iyo magaca repo-gaaga.

**MUHIIM:** `.env.local` lama push gareeyo (waxaa ilaaliya `.gitignore`). Secrets kaliya Vercel Environment Variables.

---

## Tallaabada 2 — Deploy Backend (marka hore!)

1. Tag [vercel.com](https://vercel.com) → **Add New Project**
2. Import GitHub repo-gaaga
3. **Root Directory:** `backend` → Edit → dooro `backend`
4. Framework: Next.js (auto)
5. **Environment Variables** ku dar:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon connection string-kaaga |
| `JWT_SECRET` | String dheer random ah |
| `FRONTEND_URL` | `https://YOUR-FRONTEND.vercel.app` (ka dib waad cusboonaysiin kartaa) |
| `FRONTEND_URLS` | `https://YOUR-FRONTEND.vercel.app,http://localhost:3000` |

6. **Deploy**

7. Ka dib deploy, copy **backend URL** — tusaale:
   `https://mohamed-barre-api.vercel.app`

---

## Tallaabada 3 — Deploy Frontend

1. Vercel → **Add New Project** (mar labaad, isla repo)
2. **Root Directory:** `frontend`
3. **Environment Variables:**

| Name | Value |
|------|--------|
| `BACKEND_URL` | Backend URL-ka tallaabada 2 (tusaale `https://mohamed-barre-api.vercel.app`) |

4. **Deploy**

5. Copy **frontend URL** — tusaale `https://mohamed-barre.vercel.app`

---

## Tallaabada 4 — Cusboonaysii Backend CORS

Ku noqo backend project Vercel → Settings → Environment Variables:

- `FRONTEND_URL` = frontend URL-kaaga dhabta ah
- `FRONTEND_URLS` = `https://mohamed-barre.vercel.app,http://localhost:3000`

**Redeploy** backend project.

---

## Tijaabinta

| Wax | URL |
|-----|-----|
| Website | `https://YOUR-FRONTEND.vercel.app` |
| Admin login | `https://YOUR-FRONTEND.vercel.app/login` |
| API test | `https://YOUR-BACKEND.vercel.app/api/projects` |

**Admin login:**
- Username: `ENGbarre` ama `Barre@gmail.com`
- Password: `Barre@55`

---

## Sida uu u shaqeeyo

Browser-ka wuxuu u yeeraa `/backend-api/...` (isla domain-ka frontend).
Vercel frontend wuxuu **proxy** u sameeyaa backend URL-ka (`BACKEND_URL`).

```
User → frontend.vercel.app/backend-api/projects
     → (Vercel rewrite) → backend.vercel.app/api/projects
     → Neon PostgreSQL
```

---

## Dhibaatooyinka caadiga ah

| Dhibaato | Xalka |
|----------|-------|
| Contact form ma shaqeynayo | Hubi `BACKEND_URL` frontend-ka iyo `DATABASE_URL` backend-ka |
| Admin login failed | Hubi backend socdo; isticmaal `ENGbarre` / `Barre@55` |
| Images ma muuqdaan | Hubi `frontend/public/` iyo admin image URLs |
| CORS error | Cusboonaysii `FRONTEND_URL` backend-ka |

---

## Local development (kadib deploy)

```powershell
# Terminal 1 — backend
cd backend
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

- Website: `http://localhost:3000`
- Backend: `http://localhost:3001`
