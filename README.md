# Fotbal Amator — Profil & Statistici

Aplicație pentru jucători de fotbal amator din România care își urmăresc parcursul: meciuri jucate, goluri, assist-uri, evoluție în timp. Detalii de business și scope în [CLAUDE.md](./CLAUDE.md).

## Stack

Next.js 15 (App Router) + TypeScript · Prisma 7 (driver adapter `@prisma/adapter-pg`) · PostgreSQL pe Supabase · Clerk (auth) · Tailwind CSS · Vercel (deploy)

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
