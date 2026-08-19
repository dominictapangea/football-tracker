import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <Link href="/dashboard" className="hover:text-zinc-950 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/meciuri" className="hover:text-zinc-950 dark:hover:text-white">
              Meciuri
            </Link>
            <Link href="/profil" className="hover:text-zinc-950 dark:hover:text-white">
              Profil
            </Link>
          </div>
          <UserButton />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
