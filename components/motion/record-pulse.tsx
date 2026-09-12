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
