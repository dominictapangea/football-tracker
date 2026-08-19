# Proiect: Profil & Statistici pentru Jucători de Fotbal Amator (RO)

## Context de business (citește înainte să scrii cod)

Aplicație web unde jucătorii de fotbal amator din România — cei care joacă informal, cu prietenii, fără afiliere la club — își creează un profil personal și își urmăresc parcursul: meciuri jucate, goluri, assist-uri, evoluție în timp.

**Ce NU este acest produs** (important, ca să nu se adauge funcționalități greșite):
- NU e un marketplace de găsire jucători/rezervare teren (există deja Reservo, Fotbalist, Playerfy pe piața RO)
- NU e un tool de administrare de club/academie (există deja MaxClub, PlyrHQ)
- E strict despre **identitatea și progresul individual al jucătorului amator**

**Client țintă:** bărbați 18-35 ani, RO, joacă fotbal 5x5/7x7 recreativ, regulat, cu grup fix de prieteni, fără club oficial.

**Filozofie de produs pentru v1:** cel mai mic produs posibil care testează o singură ipoteză — *"userul revine constant să-și logheze meciurile timp de o lună?"* Orice funcție care nu servește direct la testarea asta NU se construiește acum, indiferent cât de tentantă e.

---

## Stack tehnic

- **Framework:** Next.js 15 (App Router) + TypeScript
- **ORM:** Prisma
- **Bază de date:** PostgreSQL, găzduită pe Supabase (plan gratuit)
- **Autentificare:** Clerk (email/parolă + Google login)
- **Stilizare:** Tailwind CSS
- **Deployment:** Vercel

**Notă despre legătura Clerk ↔ Supabase:** userul se autentifică prin Clerk. ID-ul de user din Clerk (`userId`) trebuie salvat ca și câmp în tabela `Player` din baza de date Supabase, ca să legăm datele de joc de contul autentificat. Nu folosim sistemul de auth nativ al Supabase — doar baza de date.

---

## Model de date (schemă inițială Prisma)

Entități necesare pentru v1:

- **Player** — id, clerkUserId (unic), nume, poziție preferată (opțional), createdAt
- **Match** — id, playerId (relație către Player), dată, context/notă liberă (ex: "meci de vineri"), goluri, assist-uri, rating personal (1-10, opțional), createdAt

Nu adăuga alte tabele (echipe, grupuri, comentarii etc.) în v1 — vezi secțiunea "Amânat pentru v2".

---

## Funcționalități v1 — de construit acum

- [ ] Setup proiect Next.js 15 (App Router) + TypeScript + Tailwind
- [ ] Configurare Prisma + conexiune la baza de date PostgreSQL pe Supabase
- [ ] Schema Prisma inițială (Player, Match) + prima migrare
- [ ] Integrare Clerk — pagini de sign-up / sign-in / sign-out
- [ ] Middleware de protecție rute — doar userii autentificați accesează dashboard-ul
- [ ] La primul login, creare automată a unei înregistrări `Player` legată de `clerkUserId`
- [ ] Pagină "Profilul meu" — afișare/editare nume și poziție preferată
- [ ] Formular "Adaugă meci" — dată, context liber, goluri, assist-uri, rating (opțional)
- [ ] Pagină "Istoric meciuri" — listă cronologică a meciurilor introduse de userul curent, editabile/ștergibile
- [ ] Dashboard cu statistici agregate — total meciuri jucate, total goluri, total assist-uri, medie goluri/meci
- [ ] Design responsive, funcțional corect pe mobil (majoritatea userilor vor accesa de pe telefon după meci)
- [ ] Deploy pe Vercel, cu variabile de mediu configurate corect (Clerk keys, Supabase connection string)
- [ ] Testare manuală end-to-end: sign-up → adaugă 2-3 meciuri → verifică dashboard-ul reflectă corect statisticile

---

## Amânat pentru v2+ (NU construi acum, doar dacă se cere explicit)

Aceste idei există și sunt notate intenționat aici, ca să nu se piardă — dar nu se implementează până nu validăm că userii revin constant în v1:

- Layer social — clasamente/comparații între prieteni, profiluri publice vizibile altor useri
- Grupuri/echipe — mai mulți useri loghează colaborativ același meci
- Gamificare — nivele, XP, badge-uri, achievements (idee explicită a userului, de revizitat după validare)
- Upload poze/video highlights din meciuri (Supabase Storage e deja pregătit pentru asta quando va veni momentul)
- Notificări/remindere pentru a loga meciul după joc
- Monetizare / nivel premium / integrare plăți

Dacă userul cere să înceapă lucrul la ceva din lista asta, confirmă explicit că v1 a fost deja validat înainte de a proceda, sau întreabă dacă vrea să sară peste etapa de validare.

---

## Convenții de cod

- Cod TypeScript strict (fără `any` nejustificat)
- Componente React funcționale, cu hooks
- Nume de variabile/funcții în engleză (convenție standard, chiar dacă produsul e pentru piața RO), text UI vizibil userului în română
- Commit-uri mici, descriptive, în engleză
- Nu introduce dependențe/librării noi fără să fie strict necesare pentru un item din lista v1 de mai sus

---

## Monetizare (context, nu de implementat acum)

Zero monetizare în v1. Nu integra Stripe sau orice procesator de plăți până nu se cere explicit — v1 trebuie să rămână complet gratuit pentru a nu distorsiona testul de validare cu prietenii.

---

## Workflow Git & Commit-uri

- Fă commit local (`git add` + `git commit`) după fiecare unitate logică de lucru terminată (ex: după ce ai implementat complet formularul de adăugare meci, nu după fiecare linie de cod)
- Folosește mesaje de commit descriptive, în engleză, stil conventional commits (`feat: add match logging form`, `fix: correct stats calculation`, `chore: setup prisma schema`)
- NU face `git push` automat către GitHub — push-ul rămâne manual, doar la cererea mea explicită ("push pe GitHub" sau similar)
- Dacă folderul nu are încă un repository git inițializat, întreabă înainte să inițializezi unul
