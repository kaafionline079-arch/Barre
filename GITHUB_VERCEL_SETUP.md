# GitHub + Vercel — Tilmaamaha Buuxa (Taxadar leh)

## Qaybta 1 — Push code GitHub

> **MUHIIM:** Repo-ga `kaafionline079-arch/Barre` waa inuu ka buuxo files ka hor intaadan Vercel deploy gareyn.

### Habka 1: Script (ugu fudud)

1. Fur PowerShell
2. Run:

```powershell
cd C:\Users\hp\Desktop\Mypotpholiyo
.\scripts\push-to-github.ps1
```

3. Abuur **Personal Access Token**:
   - Login GitHub → **kaafionline079-arch**
   - Settings → Developer settings → Personal access tokens → **Tokens (classic)**
   - Generate → dooro **repo** → Generate
   - Copy token-ka

4. Paste token-ka marka script-ku weydiiyo
5. Sug ilaa "PUSH SUCCESS" muuqdo

### Habka 2: GitHub Desktop

1. Install [GitHub Desktop](https://desktop.github.com)
2. Sign in: **kaafionline079-arch**
3. File → Add Local Repository → `C:\Users\hp\Desktop\Mypotpholiyo`
4. Click **Push origin**

### Hubi push-ku guuleystay

Fur: https://github.com/kaafionline079-arch/Barre

Waa inaad aragtaa:
- ✅ `frontend/` folder
- ✅ `package.json` (root)
- ✅ `vercel.json`
- ✅ `README.md`
- ❌ MA jiraan `.env.local` ama `vercel.env` (secrets — waa ammaan)

---

## Qaybta 2 — Vercel Deploy

### 1. Abuur project cusub
- [vercel.com/new](https://vercel.com/new)
- Import: **kaafionline079-arch/Barre**
- Haddii error "repository empty" → dib u eeg Qaybta 1 (push ma dhameyn)

### 2. Project Settings

| Setting | Value |
|---------|--------|
| **Framework** | Next.js |
| **Root Directory** | `frontend` |
| **Branch** | `main` |

### 3. Environment Variables

Click **Import .env** → dooro file-ka:
```
C:\Users\hp\Desktop\Mypotpholiyo\vercel.env
```

Hubi **labada** variable:
| Name | Required |
|------|----------|
| `DATABASE_URL` | ✅ |
| `JWT_SECRET` | ✅ |

Dooro: **Production + Preview + Development** (saddexda)

❌ **Ha ku darin:** `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `FRONTEND_URL`

### 4. Click Deploy

Sug 2-3 daqiiqo...

---

## Qaybta 3 — Tijaabi

Beddel `YOUR-SITE` URL-kaaga Vercel:

| Test | URL | Natiijo la filayo |
|------|-----|-------------------|
| Website | `https://YOUR-SITE.vercel.app` | Portfolio muuqda |
| Database | `https://YOUR-SITE.vercel.app/api/health` | `"database": "connected"` |
| Admin | `https://YOUR-SITE.vercel.app/login` | Login page |
| Dashboard | Login kadib → `/admin` | Messages, Projects, Images |

**Login:**
- Username: `ENGbarre` ama `Barre@gmail.com`
- Password: `Barre@55`

---

## Dhibaatooyinka

| Dhibaato | Xalka |
|----------|-------|
| Vercel: repository empty | Push GitHub marka hore (Qaybta 1) |
| Vercel: already created | Tirtir project-kii hore Vercel-ka |
| Push: Permission denied | Isticmaal account **kaafionline079-arch** + token |
| Login failed | Hubi `DATABASE_URL` + `JWT_SECRET` Vercel-ka |
| /api/health error | `DATABASE_URL` sax ma aha — dib u import `vercel.env` |
| Build failed | Root Directory = `frontend`, Framework = Next.js |

---

## Waxa aan ilaalinay (Amaan)

- ✅ `vercel.env` — `.gitignore` gudahiisa (lama push gareeyo)
- ✅ `frontend/.env.local` — lama push gareeyo
- ✅ `backend/.env.local` — lama push gareeyo
- ✅ Admin password — database-ka ku hash gareysan
- ✅ API admin routes — JWT protected
