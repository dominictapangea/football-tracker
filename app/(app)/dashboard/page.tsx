import Link from "next/link";
import { getCurrentPlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const player = await getCurrentPlayer();

  const matches = await prisma.match.findMany({
    where: { playerId: player.id },
  });

  const totalMatches = matches.length;
  const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : "0.00";

  const stats = [
    { label: "Meciuri jucate", value: totalMatches },
    { label: "Goluri", value: totalGoals },
    { label: "Assist-uri", value: totalAssists },
    { label: "Medie goluri/meci", value: avgGoals },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Salut, {player.name}
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Statisticile tale de fotbal amator.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/meciuri/adauga"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Adaugă meci
        </Link>
        <Link
          href="/meciuri"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Istoric meciuri
        </Link>
      </div>
    </div>
  );
}
