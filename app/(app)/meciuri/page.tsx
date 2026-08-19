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
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Istoric meciuri
        </h1>
        <Link href="/meciuri/adauga" className="btn-primary">
          Adaugă meci
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nu ai niciun meci înregistrat încă.
          </p>
          <Link href="/meciuri/adauga" className="btn-secondary">
            Adaugă primul meci
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {matches.map((match) => (
            <li key={match.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">
                    {new Date(match.date).toLocaleDateString("ro-RO")}
                    {match.note ? ` — ${match.note}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {match.goals} goluri · {match.assists} assist-uri
                    {match.rating ? ` · rating ${match.rating}/10` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-sm">
                  <Link
                    href={`/meciuri/${match.id}`}
                    className="rounded-md px-2 py-2 font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Editează
                  </Link>
                  <form action={deleteMatch}>
                    <input type="hidden" name="id" value={match.id} />
                    <button type="submit" className="btn-danger-ghost">
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
