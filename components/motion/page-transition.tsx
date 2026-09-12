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
