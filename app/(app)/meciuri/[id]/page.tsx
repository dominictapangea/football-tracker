import { notFound } from "next/navigation";
import { getCurrentPlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateMatch } from "../actions";
import { MatchForm } from "../match-form";

export default async function EditeazaMeciPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getCurrentPlayer();

  const match = await prisma.match.findFirst({
    where: { id, playerId: player.id },
  });

  if (!match) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Editează meci
      </h1>
      <MatchForm action={updateMatch} submitLabel="Salvează modificările" match={match} />
    </div>
  );
}
