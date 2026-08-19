"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type StatCounterProps = {
  value: number;
  decimals?: number;
  className?: string;
};

export function StatCounter({ value, decimals = 0, className }: StatCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = counter.val.toFixed(decimals);
          },
        });
      });

      return () => mm.revert();
    },
    { dependencies: [value, decimals], scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {value.toFixed(decimals)}
    </p>
  );
}
