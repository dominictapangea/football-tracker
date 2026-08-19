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
    {
      label: "Meciuri jucate",
      value: totalMatches,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h10"
        />
      ),
    },
    {
      label: "Goluri",
      value: totalGoals,
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path
            strokeLinejoin="round"
            d="m12 8.4 2.8 2-1.1 3.3H10.3l-1.1-3.3 2.8-2Z"
          />
        </>
      ),
    },
    {
      label: "Assist-uri",
      value: totalAssists,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12h13M13 6l6 6-6 6"
        />
      ),
    },
    {
      label: "Medie goluri/meci",
      value: avgGoals,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19V9m6 10V5m6 14v-7"
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Salut, {player.name}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Statisticile tale de fotbal amator.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card border-t-2 border-t-accent p-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5 text-muted-foreground"
            >
              {stat.icon}
            </svg>
            <p className="mt-3 font-display text-4xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="eyebrow mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/meciuri/adauga" className="btn-primary">
          Adaugă meci
        </Link>
        <Link href="/meciuri" className="btn-secondary">
          Istoric meciuri
        </Link>
      </div>
    </div>
  );
}
