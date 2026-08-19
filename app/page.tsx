import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="max-w-md text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Profilul tău de fotbal amator
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        Loghează meciurile jucate cu prietenii și urmărește-ți golurile,
        assist-urile și evoluția în timp.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/sign-up"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Creează cont
        </Link>
        <Link
          href="/sign-in"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Autentificare
        </Link>
      </div>
    </div>
  );
}
