"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type HeroHighlightProps = {
  dateLabel: string;
  note: string | null;
  goals: number;
  assists: number;
  rating: number | null;
};

export function HeroHighlight({ dateLabel, note, goals, assists, rating }: HeroHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(
          el,
          { opacity: 0, y: 16, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        )
          .fromTo(
            el.querySelector("[data-hero-glow]"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.7, ease: "power1.out" },
            0,
          )
          .fromTo(
            el.querySelectorAll("[data-hero-stat]"),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
            "-=0.25",
          );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="relative mt-6 overflow-hidden rounded-lg border border-accent/40 bg-card p-5"
    >
      <div
        data-hero-glow
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
        aria-hidden="true"
      />
      <p className="eyebrow relative text-accent">Ultima ta performanță</p>
      <p className="relative mt-1 text-sm text-muted-foreground">
        {dateLabel}
        {note ? ` — ${note}` : ""}
      </p>
      <div className="relative mt-4 flex flex-wrap gap-6">
        <div data-hero-stat>
          <p className="font-display text-3xl font-bold text-foreground">{goals}</p>
          <p className="eyebrow mt-0.5">Goluri</p>
        </div>
        <div data-hero-stat>
          <p className="font-display text-3xl font-bold text-foreground">{assists}</p>
          <p className="eyebrow mt-0.5">Assist-uri</p>
        </div>
        {rating ? (
          <div data-hero-stat>
            <p className="font-display text-3xl font-bold text-foreground">{rating}/10</p>
            <p className="eyebrow mt-0.5">Rating</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
