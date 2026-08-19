"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
  y?: number;
};

export function StaggerReveal({ children, className, as = "div", y = 16 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || el.children.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.children, {
          opacity: 0,
          y,
          duration: 0.4,
          stagger: { amount: 0.3, from: "start" },
          ease: "power2.out",
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  if (as === "ul") {
    return (
      <ul ref={ref} className={className}>
        {children}
      </ul>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
