import Link from "next/link";
import { getCurrentPlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteMatch } from "./actions";

export default async function MeciuriPage() {
  const player = await getCurrentPlayer();
  const matches = await prisma.match.findMany({
    where: { playerId: player.id },
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Istoric meciuri
        </h1>
        <Link
          href="/meciuri/adauga"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Adaugă meci
        </Link>
      </div>

      {matches.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Nu ai niciun meci înregistrat încă.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {matches.map((match) => (
            <li
              key={match.id}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {new Date(match.date).toLocaleDateString("ro-RO")}
                    {match.note ? ` — ${match.note}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {match.goals} goluri · {match.assists} assist-uri
                    {match.rating ? ` · rating ${match.rating}/10` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-3 text-sm">
                  <Link
                    href={`/meciuri/${match.id}`}
                    className="font-medium text-zinc-700 hover:underline dark:text-zinc-300"
                  >
                    Editează
                  </Link>
                  <form action={deleteMatch}>
                    <input type="hidden" name="id" value={match.id} />
                    <button
                      type="submit"
                      className="font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                      Șterge
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
