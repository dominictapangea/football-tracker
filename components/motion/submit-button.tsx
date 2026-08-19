"use client";

import { useFormStatus } from "react-dom";

type Variant = "primary" | "secondary" | "danger-ghost";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "danger-ghost": "btn-danger-ghost",
};

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: Variant;
  className?: string;
};

export function SubmitButton({
  children,
  pendingLabel = "Se salvează...",
  variant = "primary",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${variantClass[variant]} ${className}`}
    >
      {pending ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
            <path
              className="opacity-90"
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
