# Vibrant Football UI Refresh — Design Spec

**Date:** 2026-09-12
**Status:** Approved by user, pending implementation plan
**Scope:** Visual/motion polish only — no new pages, no new DB fields, no v2 features (per CLAUDE.md, styling is safe to do anytime independent of the v1 validation period).

## Goal

Make the existing app feel more dynamic and energetic across every screen, in a football-themed but abstract/atmospheric way (no literal ball/whistle iconography), while keeping it usable one-handed, post-match, mostly in the dark.

## Context

v1 already has a working charcoal/gold "floodlit-pitch" identity (dark stadium atmosphere), Tailwind-based design tokens in [app/globals.css](../../../app/globals.css), and a small GSAP motion library in [components/motion](../../../components/motion) (`page-transition`, `stagger-reveal`, `stat-counter`, `hero-highlight`, `submit-button`). This refresh evolves that foundation rather than replacing it — see [[project_v1_shipped]] equivalent context in CLAUDE.md.

Direction chosen collaboratively (see brainstorming transcript): a hybrid of two explored directions —
- **"Night Match"** (keep the dark stadium identity, GSAP motion throughout)
- **"Matchday Scoreboard"** (bolder red/gold energy, scoreboard-style numbers, blockier stat display)

Both light and dark mode remain supported (users likely check the app right after an evening match, in either lighting condition).

## 1. Color & Typography Foundation

Replace the single amber `--accent` token with a small energetic accent system, layered on the existing charcoal (dark) / off-white (light) base — do not change `--background`, `--foreground`, `--card`, `--muted`, `--border` tokens.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--accent-goal` (primary, replaces old `--accent`) | `#ea580c` | `#f97316` | Primary CTA, active states, links, focus ring |
| `--accent-pitch` (secondary) | `#16a34a` | `#22c55e` | Success states, positive progress, secondary highlights |
| `--accent-gold` (tertiary, "record/highlight") | `#a16207` | `#d97706` | Personal-record pulses, milestone badges — reuses the old accent value so some brand continuity survives |
| `--ring` | `#ea580c` | `#f97316` | Follows `--accent-goal` |

Exact values above are a starting point — verify actual contrast ratios (4.5:1 text, 3:1 large text/UI) against both `--background` and `--card` during implementation and nudge if needed; don't ship unchecked.

Typography stays on the existing font pair (`--font-display`: Barlow Condensed, `--font-sans`: Barlow). Aggregate stat numbers (dashboard tiles, match chips) get a distinct "scoreboard" treatment: `font-display`, heavier weight, `font-variant-numeric: tabular-nums`, displayed inside colored chip/tile backgrounds instead of plain inline text.

No literal football iconography (ball, whistle, cards, net) anywhere — energy comes from color, contrast blocks, and motion only, per the user's explicit choice.

## 2. Motion System

Extend the existing `components/motion` library; do not fork a parallel one.

- **Page transitions** — add a GSAP Flip-based shared-element transition (e.g. the stat summary) between `/dashboard`, `/meciuri`, `/profil`, replacing or augmenting the current `page-transition.tsx`. Duration 500-600ms, `expo.inOut`. Must fall back to the existing simple transition under `prefers-reduced-motion`.
- **Stagger reveal** — reuse `stagger-reveal.tsx` on: dashboard stat tile grid, match history list. Standard tier (~400-600ms, `power2.out`, ~0.06-0.08s per item stagger) — keep total reveal time short for lists.
- **Stat counters** — use `stat-counter.tsx` consistently for all four dashboard aggregates (total meciuri, goluri, assist-uri, medie goluri/meci), not just the current single usage.
- **Interactive card sweep** — extract the existing `.btn-primary::after` floodlight-sweep effect into a reusable `.card-interactive` treatment, applied to dashboard stat tiles and match history rows on hover/tap.
- **Personal-record pulse** — a short scale+glow pulse (`--accent-gold`) triggered client-side when a newly added match's goals (or assists) exceed the player's prior max, computed from already-fetched `Match` rows — no schema change needed.
- **Add-match success feedback** — a brief abstract "goal-line sweep" (horizontal gradient bar animation, not a literal ball) on successful submit, before redirecting to match history. Extends `submit-button.tsx`.
- Every new animation must respect `prefers-reduced-motion` the same way the current `globals.css` rules do (skip/shorten, never trap users in motion).

## 3. Per-Page Application

- **Dashboard** (`app/(app)/dashboard/page.tsx`) — the four aggregate stats become scoreboard-style tiles (colored, animated count-up). Add one simple trend visualization (goals/assists over the last N matches — a small line/sparkline, not a complex chart). **The `dataviz` skill must be invoked before writing any chart code**, per CLAUDE.md.
- **Istoric meciuri** (`app/(app)/meciuri/page.tsx`) — rows stagger in; each match's goals/assists render as a compact colored chip (e.g. "2G · 1A") instead of plain text; personal rating (1-10) gets a small visual bar/color indicator instead of a bare number.
- **Adaugă meci** (`app/(app)/meciuri/adauga/page.tsx`, `match-form.tsx`) — livelier submit feedback + the goal-line sweep success animation described above.
- **Profil** (`app/(app)/profil/page.tsx`) — lowest-touch page: inherits the new palette and bolder heading treatment via the existing `hero-highlight.tsx`; no new motion patterns needed here.

## Out of Scope

- No new database fields or Prisma schema changes.
- No new pages or routes.
- No v2 features (social layer, groups, gamification, media, notifications, monetization) — this is a pure visual/motion layer per CLAUDE.md's "Amânat pentru v2+" boundary.
- No changes to Clerk auth flow or match ownership logic.

## Testing

- Manual, mobile-first (per CLAUDE.md's existing v1 checklist habit): verify on a real small viewport, since most users open the app right after a match on their phone.
- Accessibility pass: contrast on both light/dark for the new accent tokens, `prefers-reduced-motion` respected everywhere new motion is added, touch targets stay ≥44×44px, keyboard focus visible on any newly-interactive card elements.
- If dashboard trend visualization requires new Prisma queries, re-verify per-player ownership scoping (`clerkUserId` filter) — run the `security-review` skill before considering this done, per CLAUDE.md's instruction for anything touching data access, even read-only.
