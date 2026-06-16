# Deploy: GitHub + Vercel (Hal Project — Amaan)

Mashruucan wuxuu isticmaalaa **Vercel Services** — frontend + backend hal domain, backend-ka waa qarsoon.

```
User → yoursite.com/backend-api/projects
     → (frontend proxy) → /_/backend/api/projects
     → Neon PostgreSQL
```

**Dadku ma arkaan** `/_/backend` — kaliya `/backend-api` ayaa la isticmaalaa.

---

## Tallaabada 1 — GitHub (hore u dhameeyey)

Repo: **https://github.com/mohamedarap2024/Barre**

Hubi in `vercel.json` uu repo-ga ku jiro (root folder).

---

## Tallaabada 2 — Vercel Deploy

1. Tag [vercel.com/new](https://vercel.com/new)
2. Import repo: **mohamedarap2024/Barre**
3. **Framework Preset:** dooro **Services** (sida screenshot-kaaga)
4. Hubi in Vercel uu arko:
   - `frontend` → `/`
   - `backend` → `/_/backend`
5. **Root Directory:** `./` (root — ha beddelin)

### Environment Variables (kaliya 2 ku dar!)

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon PostgreSQL connection string-kaaga |
| `JWT_SECRET` | String dheer random ah (tusaale 32+ characters) |

> `BACKEND_URL` iyo `FRONTEND_URL` Vercel wuu si toos ah u abuuraa — ha ku darin gacanta.

6. Click **Deploy**

---

## Tallaabada 3 — Tijaabi

| Wax | URL |
|-----|-----|
| Website | `https://barre-xxx.vercel.app` |
| Admin login | `https://barre-xxx.vercel.app/login` |
| API (proxy) | `https://barre-xxx.vercel.app/backend-api/projects` |

**Backend toos ah** (`/_/backend`) → **404** (amaan) ✅

**Admin login:**
- Username: `ENGbarre` ama `Barre@gmail.com`
- Password: `Barre@55`

---

## Sida amniga u shaqeeyo

| Feature | Sharaxaad |
|---------|-----------|
| **Proxy** | Browser wuxuu u yeeraa `/backend-api` kaliya |
| **Qarsoon path** | Backend wuxuu ku jiraa `/_/backend` — lama link gareeyo website-ka |
| **Middleware** | Backend home page + docs → 404 production-ka |
| **Admin** | JWT token — login kaliya `/login` frontend-ka |

---

## Local development

```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Ama Vercel local (dhammaan services):
```powershell
vercel dev -L
```

---

## Dhibaatooyinka

| Dhibaato | Xalka |
|----------|-------|
| Deploy button disabled | Hubi `vercel.json` uu repo root-ka ku jiro |
| Contact form ma shaqeynayo | Hubi `DATABASE_URL` Vercel Environment Variables |
| Admin login failed | Hubi `JWT_SECRET` + `DATABASE_URL` |
| 404 on `/backend-api` | Redeploy kadib `vercel.json` push |
