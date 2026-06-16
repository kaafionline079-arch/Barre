# Deploy: GitHub + Vercel (Hal Project)

Mashruucan wuxuu hadda **hal Next.js app** ah (`frontend/`) — API + website isku mid.
Tani waxay xallisaa build error-ka `EEXIST` (laba Next.js isku build).

---

## Vercel Setup

### 1. Import repo
- **mohamedarap2024/Barre**
- Framework: **Next.js** (maaha "Services")

### 2. Root Directory
**Labada mid dooro mid:**

**A (Recommended):** Vercel → Settings → General → Root Directory → `frontend`

**Ama B:** Root Directory ha ahaado `./` (root) — `vercel.json` + `package.json` root-ka ayaa frontend u build gareeya.

### 3. Environment Variables

Ku dar Vercel → Settings → Environment Variables (Production + Preview):

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` | String dheer random ah |

> **Ha ku darin** `ADMIN_USERNAME` / `ADMIN_PASSWORD` — login wuxuu isticmaalaa database.
> **Ha ku darin** `FRONTEND_URL` — looma baahna hal project.

Tusaale file: `frontend/vercel.env.example`

### 4. Deploy

---

## Kadib deploy

| Wax | URL |
|-----|-----|
| Website | `https://barre.vercel.app` |
| Admin | `https://barre.vercel.app/login` |
| API | `https://barre.vercel.app/api/projects` |

**Login:** `ENGbarre` / `Barre@55`

---

## Local development

```powershell
cd frontend
npm install
npm run dev
```

Ku dar `frontend/.env.local`:
```env
DATABASE_URL=your-neon-url
JWT_SECRET=local-dev-secret
```

Website: `http://localhost:3000`

> `backend/` folder waa development reference — Vercel wuxuu isticmaalaa `frontend/` kaliya.

---

## Dhibaatooyinka

| Dhibaato | Xalka |
|----------|-------|
| `EEXIST symlink` error | Hubi Framework = Next.js, Root = `frontend`, maaha Services |
| Contact form failed | Hubi `DATABASE_URL` Vercel-ka |
| Login failed | Hubi `DATABASE_URL` + `JWT_SECRET` |
| Build failed | Redeploy kadib push ugu dambeeyey |
