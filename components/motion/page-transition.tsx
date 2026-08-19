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

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power1.out" },
        );
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], scope: ref },
  );

  return (
    <div ref={ref} key={pathname}>
      {children}
    </div>
  );
}
