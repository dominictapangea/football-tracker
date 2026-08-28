# Fotbal Amator — Profil & Statistici

**🔗 Live: [football-tracker-personal.vercel.app](https://football-tracker-personal.vercel.app/)**

Aplicație web pentru jucătorii de fotbal amator din România — cei care joacă informal, cu prietenii, fără afiliere la club — pentru urmărirea individuală a parcursului: meciuri jucate, goluri, assist-uri, evoluție în timp. Detalii de business și scope în [CLAUDE.md](./CLAUDE.md).

<p align="center">
  <img src="https://github.com/user-attachments/assets/92638b83-cba9-4f61-9231-dff44871a89a" height="380" alt="Dashboard" />
  <img src="https://github.com/user-attachments/assets/5f506897-8717-4978-965a-76e25cf67895" height="380" alt="Istoric meciuri" />
  <img src="https://github.com/user-attachments/assets/fccb9dd2-88c7-4503-8ba1-3d89e432dba7" height="380" alt="Adaugă meci" />
  <img src="https://github.com/user-attachments/assets/e9c3a111-efb9-41cd-9385-4b6be8c5f39d" height="380" alt="Profil" />
</p>

## Funcționalități

- Autentificare (Clerk) — email/parolă și Google
- Dashboard cu statistici agregate: meciuri jucate, goluri, assist-uri, medie goluri/meci, ultima performanță
- Istoric meciuri — listă cronologică, editabilă/ștergibilă
- Adăugare meci — dată, context liber, goluri, assist-uri, rating personal (1-10, opțional)
- Profil jucător — nume, poziție preferată
- Responsive, gândit mobile-first (majoritatea userilor loghează meciul de pe telefon, imediat după joc)

## Stack

Next.js 15 (App Router) + TypeScript · Prisma 7 (driver adapter `@prisma/adapter-pg`) · PostgreSQL pe Supabase (cu Row Level Security) · Clerk (auth) · Tailwind CSS · GSAP (animații) · Vercel (deploy)

## Setup local

1. Instalează dependențele:

   ```bash
   npm install
   ```

2. Copiază `.env.example` în `.env` și completează:
   - `DATABASE_URL` — connection string-ul Supabase (Project Settings → Database → Connection string, varianta cu pooling, port 6543)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — din Clerk Dashboard → API Keys

3. Aplică schema Prisma pe baza de date:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Pornește serverul de development:

   ```bash
   npm run dev
   ```

   Deschide [http://localhost:3000](http://localhost:3000).

## Structură

- `app/(app)/dashboard` — statistici agregate (meciuri, goluri, assist-uri, medie)
- `app/(app)/profil` — editare nume/poziție jucător
- `app/(app)/meciuri` — istoric meciuri, adăugare, editare, ștergere
- `prisma/schema.prisma` — modelele `Player` și `Match`
- `middleware.ts` — protecție rute (`/dashboard`, `/profil`, `/meciuri` necesită autentificare Clerk)

## Comenzi utile

```bash
npm run dev      # dev server
npm run build    # build de producție
npm run lint     # ESLint
npx prisma studio            # explorare date
npx prisma migrate dev       # migrare schema în dev
```
