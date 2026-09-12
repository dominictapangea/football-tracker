# Vibrant Football UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every screen of the football tracker feel more dynamic and energetic (bolder color, scoreboard-style numbers, more motion) while keeping the existing charcoal/night-stadium identity, light+dark support, and zero new dependencies or DB fields.

**Architecture:** Pure presentation-layer change. Retint the existing CSS custom-property token system in `app/globals.css` (Tailwind v4 `@theme inline`), extend the existing `components/motion` GSAP library instead of forking a new one, and add two small new presentational components (a match stat chip, a trend sparkline). No Prisma schema change, no new routes, no new npm packages.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4 (CSS-first `@theme`), GSAP 3 + `@gsap/react` (`useGSAP`), Prisma 7 (read-only, existing queries only).

**Spec:** [docs/superpowers/specs/2026-09-12-vibrant-football-ui-refresh-design.md](../specs/2026-09-12-vibrant-football-ui-refresh-design.md)

## Global Constraints

- No literal football iconography (ball, whistle, card, net) anywhere — energy comes from color, contrast, and motion only (spec §1).
- No new DB fields, no new routes, no new v2 features (spec "Out of Scope").
- No new npm dependencies — GSAP, Tailwind, and plain SVG cover everything needed.
- Every new animation must respect `prefers-reduced-motion` using the same `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` pattern already used in every file under `components/motion`.
- **This project has no automated test suite** (confirmed: no test runner in `package.json`; CLAUDE.md's own v1 checklist relies on manual end-to-end testing). Every task below substitutes `npx tsc --noEmit` + manual visual verification for the write-test/run-test cycle. Do not add a test framework as part of this plan — out of scope and against CLAUDE.md's "no new dependencies unless strictly necessary" rule.
- Two spec items were scoped down during planning, for reasons explained in their tasks: the GSAP-Flip shared-element page transition (Task 7) and the "success, then redirect" add-match animation (Task 5). Both are noted inline so this isn't a silent deviation from the approved spec.
- Run `git status` before each commit and commit only the files each task actually touches (this repo's CLAUDE.md requires small, scoped, working-state commits).

---

### Task 1: Color foundation — retint accent, add pitch/gold tokens, add reusable card sweep

**Files:**
- Modify: `app/globals.css:1-58` (tokens), `app/globals.css:102-105` (`.card` block, to add `.card-interactive` alongside it), end of file (new `.card-interactive::after` rules next to the existing `.btn-primary::after` rules)

**Interfaces:**
- Produces: Tailwind utility classes `text-pitch` / `bg-pitch` / `border-pitch` / `border-t-pitch`, `text-gold` / `bg-gold` / `border-gold`, and a `.card-interactive` class (apply alongside `.card`) — all consumed by Tasks 2 and 3.
- Produces: `--accent`, `--pitch`, `--gold` CSS custom properties, directly readable as `var(--pitch)` etc. — consumed by Task 6's inline SVG.

- [ ] **Step 1: Retint `--accent` and add `--pitch` / `--gold` tokens in `:root`**

Replace the `:root` block:

```css
:root {
  --background: #fafaf9;
  --foreground: #0c0a09;
  --card: #ffffff;
  --card-foreground: #0c0a09;
  --muted: #f0ede9;
  --muted-foreground: #57534e;
  --border: #e7e2dc;
  --primary: #0c0a09;
  --primary-foreground: #fafaf9;
  --accent: #a16207;
  --accent-foreground: #ffffff;
  --turf: #1b2e1f;
  --destructive: #b91c1c;
  --destructive-foreground: #ffffff;
  --ring: #a16207;
  --glow-1: 20% -10%, rgba(161, 98, 7, 0.07);
  --glow-2: 100% 115%, rgba(27, 46, 31, 0.05);
}
```

with:

```css
:root {
  --background: #fafaf9;
  --foreground: #0c0a09;
  --card: #ffffff;
  --card-foreground: #0c0a09;
  --muted: #f0ede9;
  --muted-foreground: #57534e;
  --border: #e7e2dc;
  --primary: #0c0a09;
  --primary-foreground: #fafaf9;
  --accent: #c2410c;
  --accent-foreground: #ffffff;
  --pitch: #15803d;
  --gold: #a16207;
  --turf: #1b2e1f;
  --destructive: #b91c1c;
  --destructive-foreground: #ffffff;
  --ring: #c2410c;
  --glow-1: 20% -10%, rgba(194, 65, 12, 0.08);
  --glow-2: 100% 115%, rgba(27, 46, 31, 0.05);
}
```

`#c2410c` (orange-700) and `#15803d` (green-700) are picked to hold ≥4.5:1 contrast against the light `--background`/`--card` (verified: accent ≈4.96:1, pitch ≈4.81:1) — needed because both are used as small text (eyebrow labels, chips), not just backgrounds. `--gold` reuses the *old* accent value, so the previous brand color survives as the "record/highlight" tertiary instead of disappearing.

- [ ] **Step 2: Add `--pitch` / `--gold` to the dark-mode override and fix the dark `--ring`**

Replace the dark media block:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0c0a09;
    --foreground: #fafaf9;
    --card: #1c1917;
    --card-foreground: #fafaf9;
    --muted: #292524;
    --muted-foreground: #a8a29e;
    --border: #3f3a36;
    --primary: #fafaf9;
    --primary-foreground: #0c0a09;
    --accent: #d97706;
    --glow-1: 15% -15%, rgba(217, 119, 6, 0.16);
    --glow-2: 100% 115%, rgba(45, 74, 52, 0.5);
  }
}
```

with:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0c0a09;
    --foreground: #fafaf9;
    --card: #1c1917;
    --card-foreground: #fafaf9;
    --muted: #292524;
    --muted-foreground: #a8a29e;
    --border: #3f3a36;
    --primary: #fafaf9;
    --primary-foreground: #0c0a09;
    --accent: #f97316;
    --pitch: #22c55e;
    --gold: #d97706;
    --ring: #f97316;
    --glow-1: 15% -15%, rgba(249, 115, 22, 0.18);
    --glow-2: 100% 115%, rgba(45, 74, 52, 0.5);
  }
}
```

`--ring` was previously never overridden in dark mode (silently reusing the light value) — this fixes that inconsistency as part of the same edit, since it's directly touched by this task.

- [ ] **Step 3: Expose the new tokens as Tailwind theme colors**

In the `@theme inline` block, add two lines after `--color-accent-foreground`:

```css
  --color-accent-foreground: var(--accent-foreground);
  --color-pitch: var(--pitch);
  --color-gold: var(--gold);
  --color-turf: var(--turf);
```

(replacing the existing `--color-accent-foreground: var(--accent-foreground);` / `--color-turf: var(--turf);` pair with this three-line version).

- [ ] **Step 4: Add the reusable `.card-interactive` hover/tap treatment**

In the `@layer components` block, immediately after the `.card` rule (`app/globals.css:102-104`), add:

```css
  .card-interactive {
    @apply relative overflow-hidden transition-transform duration-150 active:scale-[0.99];
  }
```

Then, after the existing `.btn-primary:hover::after` rule (the floodlight sweep), add the same sweep adapted for block-level cards:

```css
/* Same floodlight sweep as buttons, reused on interactive cards (stat tiles, match rows). */
.card-interactive::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 40%,
    color-mix(in srgb, var(--accent) 35%, transparent) 50%,
    transparent 60%
  );
  transform: translateX(-120%);
  pointer-events: none;
}

.card-interactive:hover::after {
  transform: translateX(120%);
  transition: transform 0.6s ease;
}
```

- [ ] **Step 5: Extend the `prefers-reduced-motion` block to cover the new class**

In the existing `@media (prefers-reduced-motion: reduce)` block, change:

```css
  .btn-primary,
  .btn-secondary {
    transition: none;
  }

  .btn-primary:active,
  .btn-secondary:active,
  .btn-danger-ghost:active,
  a:active {
    transform: none;
  }
```

to:

```css
  .btn-primary,
  .btn-secondary,
  .card-interactive {
    transition: none;
  }

  .card-interactive::after {
    display: none;
  }

  .btn-primary:active,
  .btn-secondary:active,
  .btn-danger-ghost:active,
  .card-interactive:active,
  a:active {
    transform: none;
  }
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (this task only touches CSS, so this mainly guards against an unrelated pre-existing break).

- [ ] **Step 7: Visual verification**

Start the dev server (use the `run` skill or `npm run dev`), open `/dashboard`. Confirm: buttons and focus rings now show the new orange instead of the old amber, in both light and dark (toggle OS theme or devtools `prefers-color-scheme` emulation). No layout should have changed yet — only color.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css
git commit -m "feat: retint accent to vivid orange, add pitch/gold tokens and card-interactive sweep"
```

---

### Task 2: Dashboard scoreboard stat tiles

**Files:**
- Modify: `app/(app)/dashboard/page.tsx:22-114`

**Interfaces:**
- Consumes: `--color-pitch` / `--color-gold` utilities and `.card-interactive` from Task 1.
- Consumes: `StatCounter` (existing, `components/motion/stat-counter.tsx`) — unchanged signature.

- [ ] **Step 1: Give each stat tile its own accent and apply the interactive sweep**

Replace the `stats` array (`app/(app)/dashboard/page.tsx:22-73`) with a version that adds an `accentClass` per stat:

```tsx
  const stats = [
    {
      label: "Meciuri jucate",
      value: totalMatches,
      decimals: 0,
      accentClass: "border-t-border text-muted-foreground",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h10"
        />
      ),
    },
    {
      label: "Goluri",
      value: totalGoals,
      decimals: 0,
      accentClass: "border-t-pitch text-pitch",
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path
            strokeLinejoin="round"
            d="m12 8.4 2.8 2-1.1 3.3H10.3l-1.1-3.3 2.8-2Z"
          />
        </>
      ),
    },
    {
      label: "Assist-uri",
      value: totalAssists,
      decimals: 0,
      accentClass: "border-t-accent text-accent",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12h13M13 6l6 6-6 6"
        />
      ),
    },
    {
      label: "Medie goluri/meci",
      value: avgGoals,
      decimals: 2,
      accentClass: "border-t-gold text-gold",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19V9m6 10V5m6 14v-7"
        />
      ),
    },
  ];
```

- [ ] **Step 2: Render the new per-tile color and tabular numbers**

Replace the tile-rendering block (`app/(app)/dashboard/page.tsx:94-114`):

```tsx
      <StaggerReveal className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card border-t-2 border-t-accent p-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5 text-muted-foreground"
            >
              {stat.icon}
            </svg>
            <StatCounter
              value={stat.value}
              decimals={stat.decimals}
              className="mt-3 font-display text-4xl font-bold text-foreground"
            />
            <p className="eyebrow mt-1">{stat.label}</p>
          </div>
        ))}
      </StaggerReveal>
```

with:

```tsx
      <StaggerReveal className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`card card-interactive border-t-2 p-4 ${stat.accentClass}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5"
            >
              {stat.icon}
            </svg>
            <StatCounter
              value={stat.value}
              decimals={stat.decimals}
              className="mt-3 font-display text-4xl font-bold tabular-nums text-foreground"
            />
            <p className="eyebrow mt-1">{stat.label}</p>
          </div>
        ))}
      </StaggerReveal>
```

Note the icon `<svg>` lost its own `text-muted-foreground` — it now inherits its color from the tile's `accentClass` via `stroke="currentColor"`, so each icon tints to match its tile.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Visual verification**

Reload `/dashboard` (with at least one match logged, so all four tiles render). Confirm: "Meciuri jucate" is neutral, "Goluri" is green, "Assist-uri" is orange, "Medie goluri/meci" is gold — each tile's icon matches its border/number color. Hover/tap a tile on desktop and confirm the sweep animation plays once per hover. Check both light and dark.

- [ ] **Step 5: Commit**

```bash
git add "app/(app)/dashboard/page.tsx"
git commit -m "feat: give dashboard stat tiles distinct scoreboard colors"
```

---

### Task 3: Match history compact stat chip

**Files:**
- Create: `components/match-stat-chip.tsx`
- Modify: `app/(app)/meciuri/page.tsx:38-65`

**Interfaces:**
- Produces: `MatchStatChip({ goals: number; assists: number; rating: number | null })` — a plain server-renderable component (no hooks, no `"use client"`), consumed only by `app/(app)/meciuri/page.tsx` in this plan.

- [ ] **Step 1: Create the chip component**

```tsx
type MatchStatChipProps = {
  goals: number;
  assists: number;
  rating: number | null;
};

export function MatchStatChip({ goals, assists, rating }: MatchStatChipProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center rounded-md bg-pitch/15 px-2 py-0.5 font-display text-sm font-bold tabular-nums text-pitch">
        {goals}G
      </span>
      <span className="inline-flex items-center rounded-md bg-accent/15 px-2 py-0.5 font-display text-sm font-bold tabular-nums text-accent">
        {assists}A
      </span>
      {rating ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-gold"
              style={{ width: `${(rating / 10) * 100}%` }}
            />
          </span>
          {rating}/10
        </span>
      ) : null}
    </div>
  );
}
```

Save as `components/match-stat-chip.tsx` (top-level `components/`, not `components/motion/`, since it has no animation of its own).

- [ ] **Step 2: Use it in the match history list**

In `app/(app)/meciuri/page.tsx`, add the import alongside the existing ones:

```tsx
import { MatchStatChip } from "@/components/match-stat-chip";
```

Replace:

```tsx
            <li key={match.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">
                    {new Date(match.date).toLocaleDateString("ro-RO")}
                    {match.note ? ` — ${match.note}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {match.goals} goluri · {match.assists} assist-uri
                    {match.rating ? ` · rating ${match.rating}/10` : ""}
                  </p>
                </div>
```

with:

```tsx
            <li key={match.id} className="card card-interactive p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">
                    {new Date(match.date).toLocaleDateString("ro-RO")}
                    {match.note ? ` — ${match.note}` : ""}
                  </p>
                  <MatchStatChip
                    goals={match.goals}
                    assists={match.assists}
                    rating={match.rating}
                  />
                </div>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Visual verification**

Open `/meciuri` with a few matches logged (including at least one with a rating and one without). Confirm: goals/assists render as small colored chips ("2G", "1A"), rating shows a small filled bar instead of plain text, rows sweep on hover/tap, and the "Editează"/"Șterge" controls in the same row are unaffected (still full-height tap targets).

- [ ] **Step 5: Commit**

```bash
git add components/match-stat-chip.tsx "app/(app)/meciuri/page.tsx"
git commit -m "feat: show match goals/assists/rating as scoreboard chips in match history"
```

---

### Task 4: Personal-record pulse on the dashboard hero

**Files:**
- Create: `components/motion/record-pulse.tsx`
- Modify: `components/motion/hero-highlight.tsx`
- Modify: `app/(app)/dashboard/page.tsx`

**Interfaces:**
- Produces: `RecordPulse({ children: React.ReactNode; className?: string })` — wraps any element, consumed by `hero-highlight.tsx`.
- Modifies `HeroHighlightProps` to add `isRecordGoals?: boolean` — consumed by `dashboard/page.tsx`.

- [ ] **Step 1: Create the `RecordPulse` component**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type RecordPulseProps = {
  children: React.ReactNode;
  className?: string;
};

export function RecordPulse({ children, className }: RecordPulseProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const glow = el.querySelector<HTMLElement>("[data-record-glow]");

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.6 });
        tl.to(el, { scale: 1.08, duration: 0.35, ease: "power2.out" }).to(el, {
          scale: 1,
          duration: 0.35,
          ease: "power2.in",
        });
        if (glow) {
          tl.fromTo(
            glow,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1.4, duration: 0.6, ease: "power1.out" },
            0,
          ).to(glow, { opacity: 0, duration: 0.4 }, 0.5);
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      <span
        data-record-glow
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/40 opacity-0 blur-xl"
      />
      {children}
    </div>
  );
}
```

Only `scale` and `opacity` are tweened (both GSAP-native, no risk of unsupported CSS property interpolation), and it reuses the "absolute blurred glow div" pattern already established in `hero-highlight.tsx`.

- [ ] **Step 2: Wire it into `HeroHighlight`**

In `components/motion/hero-highlight.tsx`, add the import and prop:

```tsx
import { RecordPulse } from "@/components/motion/record-pulse";

type HeroHighlightProps = {
  dateLabel: string;
  note: string | null;
  goals: number;
  assists: number;
  rating: number | null;
  isRecordGoals?: boolean;
};

export function HeroHighlight({
  dateLabel,
  note,
  goals,
  assists,
  rating,
  isRecordGoals = false,
}: HeroHighlightProps) {
```

Replace the goals stat block:

```tsx
        <div data-hero-stat>
          <p className="font-display text-3xl font-bold text-foreground">{goals}</p>
          <p className="eyebrow mt-0.5">Goluri</p>
        </div>
```

with:

```tsx
        <div data-hero-stat>
          {isRecordGoals ? (
            <RecordPulse>
              <p className="font-display text-3xl font-bold tabular-nums text-foreground">
                {goals}
              </p>
            </RecordPulse>
          ) : (
            <p className="font-display text-3xl font-bold tabular-nums text-foreground">{goals}</p>
          )}
          <p className="eyebrow mt-0.5">Goluri</p>
        </div>
```

- [ ] **Step 3: Compute the record flag in the dashboard**

In `app/(app)/dashboard/page.tsx`, after the existing `const latestMatch = matches[0];` line, add:

```tsx
  const maxGoalsInAMatch = matches.reduce((max, m) => Math.max(max, m.goals), 0);
  const isRecordGoals = Boolean(
    latestMatch && latestMatch.goals > 0 && latestMatch.goals === maxGoalsInAMatch,
  );
```

Then pass it to `HeroHighlight`:

```tsx
        <HeroHighlight
          dateLabel={new Date(latestMatch.date).toLocaleDateString("ro-RO")}
          note={latestMatch.note}
          goals={latestMatch.goals}
          assists={latestMatch.assists}
          rating={latestMatch.rating}
          isRecordGoals={isRecordGoals}
        />
```

Note the intended (simple, stateless) behavior: the pulse plays whenever the *most recent* match ties or sets the player's all-time goals record — every time the dashboard is viewed, not just once. Tracking "already celebrated" would need a new DB field, which is out of scope (spec "Out of Scope").

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Visual verification**

Log a match with more goals than any previous match, then open `/dashboard`. Confirm the goals number in the "Ultima ta performanță" hero pulses with a gold glow shortly after the hero animates in. Log a second, lower-scoring match and confirm the pulse does *not* play. Check with `prefers-reduced-motion` enabled that the pulse is skipped (the number should still render normally, just static).

- [ ] **Step 6: Commit**

```bash
git add components/motion/record-pulse.tsx components/motion/hero-highlight.tsx "app/(app)/dashboard/page.tsx"
git commit -m "feat: pulse the goals stat when a match ties or sets a personal record"
```

---

### Task 5: Livelier in-flight submit feedback

**Files:**
- Modify: `app/globals.css` (new keyframe + class)
- Modify: `components/motion/submit-button.tsx`

**Interfaces:** none new — `SubmitButton`'s existing props/signature are unchanged.

**Scope note:** the spec asked for a "goal-line sweep" animation on add-match *success, before redirecting*. `createMatch`/`updateMatch` (`app/(app)/meciuri/actions.ts`) call Next's `redirect()` server-side immediately after the mutation — the client never observes a distinct "success" state to animate before navigation happens, short of restructuring those actions to redirect client-side instead. That restructuring risks the validated, working add-match flow for a purely cosmetic gain, so this task instead makes the existing *pending* (in-flight) state — which the client already controls via `useFormStatus` — feel livelier. Flagging this here per the plan's job of locking in real engineering decisions, not silently dropping a spec line.

- [ ] **Step 1: Add the pending-sweep keyframe and class**

In `app/globals.css`, after the `.card-interactive:hover::after` rule added in Task 1, add:

```css
@keyframes button-pending-sweep {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

.btn-pending-sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 40%,
    color-mix(in srgb, var(--accent-foreground) 35%, transparent) 50%,
    transparent 60%
  );
  animation: button-pending-sweep 1.1s ease-in-out infinite;
}
```

In the `prefers-reduced-motion: reduce` block, add:

```css
  .btn-pending-sweep {
    animation: none;
    opacity: 0.5;
  }
```

- [ ] **Step 2: Render the sweep during pending, for primary/secondary only**

Replace `components/motion/submit-button.tsx`'s return block:

```tsx
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${variantClass[variant]} ${className}`}
    >
      {pending ? (
```

with:

```tsx
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${variantClass[variant]} ${className}`}
    >
      {pending && variant !== "danger-ghost" ? (
        <span aria-hidden="true" className="btn-pending-sweep" />
      ) : null}
      {pending ? (
```

(the rest of the function is unchanged — this only inserts one conditional span before the existing spinner/label block). `danger-ghost` (the delete button) is excluded deliberately — a delete action shouldn't feel celebratory.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Visual verification**

On `/meciuri/adauga`, submit the form (throttle network in devtools to see it clearly) and confirm a light sweep animates repeatedly across the primary button while it's pending. Confirm the "Șterge" button on `/meciuri` still shows only its spinner, no sweep.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/motion/submit-button.tsx
git commit -m "feat: add repeating sweep animation to primary buttons while pending"
```

---

### Task 6: Dashboard goals trend sparkline

**Files:**
- Create: `components/dashboard-trend.tsx`
- Modify: `app/(app)/dashboard/page.tsx`

**Interfaces:**
- Produces: `DashboardTrend({ points: { date: Date; goals: number }[] })` — plain server-renderable component, consumed only by `dashboard/page.tsx`.

- [ ] **Step 1: Invoke the `dataviz` skill before writing any chart code**

This is mandatory per this repo's CLAUDE.md ("dacă/când dashboard-ul de statistici capătă grafice ... verifică skill-ul întâi"). Run the `dataviz` skill now and read its guidance on color choice and accessibility for a small single-series trend indicator before continuing to Step 2. Carry forward: use a semantic color (not a decorative one) for the line, and don't rely on color alone to convey the data — this is why Step 2 includes an `aria-label` summary and a visually-hidden data table, not just an SVG line.

- [ ] **Step 2: Create the sparkline component**

```tsx
type TrendPoint = {
  date: Date;
  goals: number;
};

type DashboardTrendProps = {
  points: TrendPoint[];
};

export function DashboardTrend({ points }: DashboardTrendProps) {
  if (points.length < 2) return null;

  const width = 280;
  const height = 64;
  const max = Math.max(1, ...points.map((p) => p.goals));
  const stepX = width / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: i * stepX,
    y: height - (p.goals / max) * (height - 8) - 4,
  }));

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");

  const summary = points
    .map((p) => `${new Date(p.date).toLocaleDateString("ro-RO")}: ${p.goals} goluri`)
    .join(", ");

  return (
    <div className="mt-6">
      <p className="eyebrow">Evoluție goluri — ultimele {points.length} meciuri</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-2 h-16 w-full"
        role="img"
        aria-label={`Goluri pe ultimele ${points.length} meciuri: ${summary}`}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--pitch)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="2.5" fill="var(--pitch)" />
        ))}
      </svg>
      <table className="sr-only">
        <caption>Goluri pe meci, în ordine cronologică</caption>
        <tbody>
          <tr>
            {points.map((p, i) => (
              <td key={i}>
                {new Date(p.date).toLocaleDateString("ro-RO")}: {p.goals} goluri
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

Plain inline SVG (matches the hand-drawn icon convention already used in this codebase) — no charting library added.

- [ ] **Step 3: Feed it from the dashboard's existing (already ownership-scoped) query**

In `app/(app)/dashboard/page.tsx`, add the import:

```tsx
import { DashboardTrend } from "@/components/dashboard-trend";
```

After the `stats` array, add:

```tsx
  const trendPoints = [...matches]
    .slice(0, 8)
    .reverse()
    .map((m) => ({ date: m.date, goals: m.goals }));
```

(`matches` is already ordered newest-first; `.slice(0, 8)` takes the 8 most recent, `.reverse()` puts them in chronological left-to-right order for the chart.)

Render it after the `StaggerReveal` stat grid closes, before the "Adaugă meci" button row:

```tsx
      {trendPoints.length >= 2 ? <DashboardTrend points={trendPoints} /> : null}

      <div className="mt-8 flex flex-wrap gap-3">
```

(replacing the plain `<div className="mt-8 flex flex-wrap gap-3">` line with the two lines above).

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Visual verification**

With at least 2 matches logged, open `/dashboard` and confirm a small green trend line renders below the stat tiles. With 0 or 1 match, confirm nothing renders there (no broken/empty chart). Inspect the accessibility tree (or a screen reader) and confirm the SVG's `aria-label` reads out the per-match goal values.

- [ ] **Step 6: Commit**

```bash
git add components/dashboard-trend.tsx "app/(app)/dashboard/page.tsx"
git commit -m "feat: add goals trend sparkline to dashboard"
```

---

### Task 7: Energize page transitions

**Files:**
- Modify: `components/motion/page-transition.tsx`

**Interfaces:** none new — `PageTransition`'s existing props/signature are unchanged.

**Scope note:** the spec asked for a GSAP-Flip shared-element transition between `/dashboard`, `/meciuri`, and `/profil`. Flip requires the "from" and "to" states to be the *same persistent DOM element* (or a captured/cloned snapshot) across the transition; these three routes are independent server components with no shared element between them today, and Next's App Router unmounts/remounts `children` on navigation rather than keeping a node alive to `Flip.from()`. Building that would mean introducing a persistent shared layout element purely to have something to Flip — disproportionate for a styling pass. This task instead makes the existing simple fade+slide transition (which already re-runs per route via the `pathname` key) feel more energetic with a colored sweep bar, achieving a similar "dynamic between pages" feeling at far lower risk.

- [ ] **Step 1: Add a colored sweep bar and a slightly bigger, punchier fade**

Replace `components/motion/page-transition.tsx` in full:

```tsx
"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const sweep = el.querySelector<HTMLElement>("[data-transition-sweep]");

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        tl.fromTo(
          el,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        );
        if (sweep) {
          tl.fromTo(
            sweep,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.45, ease: "power2.out" },
            0,
          ).to(sweep, { opacity: 0, duration: 0.3 }, 0.35);
        }
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], scope: ref },
  );

  return (
    <div ref={ref} key={pathname} className="relative">
      <span
        data-transition-sweep
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent"
      />
      {children}
    </div>
  );
}
```

Under `prefers-reduced-motion: reduce`, the sweep span simply renders as a static thin accent line (no animation runs) rather than being hidden — harmless and consistent with "render the final state, don't trap in motion."

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visual verification**

Navigate between Dashboard / Meciuri / Profil (desktop top nav and mobile bottom nav) and confirm a thin orange bar sweeps left-to-right across the top of the content on every navigation, alongside the fade. Confirm it still works with `prefers-reduced-motion` enabled (content appears immediately, static bar, no animation).

- [ ] **Step 4: Commit**

```bash
git add components/motion/page-transition.tsx
git commit -m "feat: add accent sweep bar to page transitions"
```

---

### Task 8: Final QA pass — accessibility, mobile, profil verification, security review

**Files:** none expected (fix-forward only if this step surfaces an issue)

- [ ] **Step 1: Full type-check**

Run: `npx tsc --noEmit`
Expected: no errors across the whole project.

- [ ] **Step 2: Mobile viewport check**

Using the `run` skill (or the Browser tool's `resize_window` to a 375×812 mobile preset), walk through: sign-in → dashboard → adaugă meci → meciuri → profil. Confirm no horizontal scroll, all touch targets remain ≥44×44px, and the bottom nav still reads correctly against the new accent color.

- [ ] **Step 3: Light/dark + reduced-motion matrix**

Check both light and dark mode (OS/devtools toggle) with `prefers-reduced-motion` both on and off — 4 combinations — on `/dashboard` and `/meciuri` specifically (the two pages with the most new motion/color). Confirm text stays readable (no accent-on-accent contrast issues) in all four.

- [ ] **Step 4: Profil page spot-check**

Open `/profil`. It received no direct code changes in this plan, only the cascading token retint from Task 1 (headings, focus rings, submit button). Confirm it looks consistent with the rest of the app and nothing regressed.

- [ ] **Step 5: Security review**

This plan added one new derived-data computation (the goals trend, Task 6, and the personal-record check, Task 4) — both reuse the dashboard's existing `prisma.match.findMany({ where: { playerId: player.id } ...})` query with no new query added, but per this repo's CLAUDE.md ("obligatoriu înainte de a considera gata orice cod care atinge ... acces la date per-user"), invoke the `security-review` skill now and confirm it raises nothing new.

- [ ] **Step 6: Final commit (only if Steps 1-5 required fixes)**

```bash
git add -A
git commit -m "fix: address QA findings from vibrant UI refresh pass"
```

If no fixes were needed, skip this commit — the feature is already fully committed across Tasks 1-7.
