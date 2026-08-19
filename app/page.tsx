import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent text-accent">
        <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M12 8.2 15 10.4l-1.1 3.5H10.1L9 10.4 12 8.2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="eyebrow mt-5">Fotbal amator · România</p>
      <h1 className="mt-2 max-w-md font-display text-5xl font-bold tracking-tight text-foreground">
        Profilul tău de fotbal amator
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Loghează meciurile jucate cu prietenii și urmărește-ți golurile,
        assist-urile și evoluția în timp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/sign-up" className="btn-primary px-8 py-3 text-base">
          Creează cont
        </Link>
        <Link href="/sign-in" className="btn-secondary px-8 py-3 text-base">
          Autentificare
        </Link>
      </div>
    </div>
  );
}
