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

## Skill-uri Claude Code — folosește-le activ

Sesiunile de lucru pe acest proiect au acces la un set de skill-uri instalate (plugin-uri + skill-uri built-in). Nu le trata ca opționale — verifică la fiecare task dacă unul dintre ele se potrivește, și invocă-l în loc să improvizezi manual un echivalent mai slab. Mai jos e harta: ce skill, pentru ce situație din acest proiect.

**Din plugin-ul `superpowers` (workflow de dezvoltare):**
- `superpowers:using-superpowers` — verifică la începutul oricărei conversații ce skill-uri există înainte de a răspunde ad-hoc.
- `superpowers:brainstorming` — înainte de a construi orice funcționalitate nouă (ex: un item din lista v1, sau orice idee din "Amânat pentru v2+" dacă userul cere explicit să înceapă lucrul la ea) — clarifică intenția și design-ul înainte de cod.
- `superpowers:writing-plans` — când există o cerință/spec multi-pas (ex: "adaugă întreg fluxul de adăugare meci") — scrie planul înainte să atingi codul.
- `superpowers:test-driven-development` — la orice feature sau bugfix, înainte de a scrie codul de implementare.
- `superpowers:systematic-debugging` — la orice bug, test picat sau comportament neașteptat, înainte de a propune un fix.
- `superpowers:executing-plans` / `superpowers:subagent-driven-development` — pentru a executa un plan scris anterior, cu checkpoint-uri de review.
- `superpowers:dispatching-parallel-agents` — când apar 2+ task-uri independente (fără stare comună) care pot rula în paralel.
- `superpowers:using-git-worktrees` — înainte de a începe lucru pe o feature care are nevoie de izolare față de workspace-ul curent.
- `superpowers:requesting-code-review` / `superpowers:receiving-code-review` — la finalizarea unei implementări majore, înainte de merge; tratează feedback-ul primit cu rigoare, nu doar acceptare performativă.
- `superpowers:verification-before-completion` — obligatoriu înainte de a declara orice lucru "gata", "fixat" sau "trece" — rulează comenzile de verificare și confirmă output-ul, nu presupune.
- `superpowers:finishing-a-development-branch` — când implementarea e completă și toate testele trec, ca să decizi cum integrezi munca (merge, PR etc.).
- `superpowers:writing-skills` — dacă apare nevoia să creezi sau editezi un skill nou pentru acest proiect.

**Din plugin-ul `ui-ux-pro-max` (design & UI):**
- `ui-ux-pro-max:ui-ux-pro-max` — la orice task de design/UI: pagini, componente, accesibilitate, layout responsive, tipografie, culoare, iconuri — relevant constant, dat fiind că userii accesează majoritar de pe mobil.
- `ui-ux-pro-max:ui-styling` — la implementare efectivă de UI cu Tailwind (formulare, dashboard, componente accesibile, dark mode).
- `ui-ux-pro-max:design-system` — dacă apare nevoia de tokens de design consistente (spacing, culoare, tipografie) pe măsură ce UI-ul crește.
- `ui-ux-pro-max:brand` — dacă/când produsul capătă identitate vizuală proprie (nume, ton, culori de brand).
- `ui-ux-pro-max:banner-design` / `ui-ux-pro-max:slides` / `ui-ux-pro-max:design` (logo, CIP, social) — doar dacă userul cere explicit materiale de marketing/prezentare — nu relevante pentru v1 funcțional.

**Skill-uri built-in:**
- `code-review` — după orice unitate de lucru semnificativă, înainte de commit, pentru bug-uri de corectitudine și oportunități de simplificare.
- `simplify` — pe cod deja scris, pentru reuse/eficiență, fără să vâneze bug-uri (complementar cu `code-review`).
- `security-review` — obligatoriu înainte de a considera gata orice cod care atinge auth (Clerk), acces la date per-user (Prisma queries — ownership checks), sau input de la user.
- `run` — pentru a porni și verifica vizual aplicația (dev server, testare manuală end-to-end cerută explicit în lista v1).
- `artifact-design` / `artifact-diagramming` / `artifact-capabilities` — dacă livrezi ceva ca Artifact (rapoarte, mockup-uri, diagrame) — de încărcat înainte de a scrie fișierul.
- `dataviz` — dacă/când dashboard-ul de statistici capătă grafice (momentan e text simplu, dar la orice adăugare de chart, verifică skill-ul întâi).
- `update-config` — pentru orice modificare de `.claude/settings.json` sau permisiuni.
- `fewer-permission-prompts` — dacă prompt-urile de permisiune devin repetitive pe comenzi read-only.
- `init` — doar dacă CLAUDE.md ar trebui regenerat de la zero (nu e cazul, există deja).

Regula generală: dacă un skill din listă se potrivește cu ce urmează să faci, invocă-l explicit prin tool-ul `Skill` înainte de a proceda manual — nu presupune că abordarea implicită e suficientă doar pentru că e mai rapidă.

## Workflow Git & Commit-uri

- Fă commit local (`git add` + `git commit`) după fiecare modificare/schimbare relevantă făcută în fișiere — nu aștepta să se acumuleze mai multe schimbări nelegate între ele. "Relevantă" înseamnă orice unitate de lucru cu sens de sine stătător (ex: un fix, un fișier nou de configurare, un endpoint, o pagină, o secțiune din schema Prisma) — nu fiecare linie editată izolat.
- Fiecare commit trebuie să aibă un mesaj specific, descriptiv, în engleză, stil conventional commits, care reflectă exact ce s-a schimbat și de ce (`feat: add match logging form`, `fix: correct stats calculation`, `chore: setup prisma schema`) — nu mesaje generice de tip "update files" sau "changes".
- NU face `git push` automat către GitHub — push-ul rămâne manual, doar la cererea mea explicită ("push pe GitHub" sau similar). Commit-urile locale se fac fără să aștepți aprobare, dar push-ul necesită mereu cererea mea directă.
- Dacă folderul nu are încă un repository git inițializat, întreabă înainte să inițializezi unul
