"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getOwnedPlayerId(userId: string) {
  const player = await prisma.player.findUnique({ where: { clerkUserId: userId } });
  if (!player) throw new Error("Jucător inexistent");
  return player.id;
}

function parseMatchInput(formData: FormData) {
  const date = String(formData.get("date") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  const goals = Number(formData.get("goals") ?? 0);
  const assists = Number(formData.get("assists") ?? 0);
  const ratingRaw = String(formData.get("rating") ?? "").trim();

  if (!date) throw new Error("Data este obligatorie");

  return {
    date: new Date(date),
    note: note || null,
    goals: Number.isFinite(goals) ? Math.max(0, Math.trunc(goals)) : 0,
    assists: Number.isFinite(assists) ? Math.max(0, Math.trunc(assists)) : 0,
    rating: ratingRaw
      ? Math.min(10, Math.max(1, Math.trunc(Number(ratingRaw))))
      : null,
  };
}

export async function createMatch(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Neautentificat");

  const playerId = await getOwnedPlayerId(userId);
  const data = parseMatchInput(formData);

  await prisma.match.create({ data: { ...data, playerId } });

  revalidatePath("/meciuri");
  revalidatePath("/dashboard");
  redirect("/meciuri");
}

export async function updateMatch(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Neautentificat");

  const id = String(formData.get("id") ?? "");
  const playerId = await getOwnedPlayerId(userId);
  const data = parseMatchInput(formData);

  await prisma.match.updateMany({
    where: { id, playerId },
    data,
  });

  revalidatePath("/meciuri");
  revalidatePath("/dashboard");
  redirect("/meciuri");
}

export async function deleteMatch(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Neautentificat");

  const id = String(formData.get("id") ?? "");
  const playerId = await getOwnedPlayerId(userId);

  await prisma.match.deleteMany({ where: { id, playerId } });

  revalidatePath("/meciuri");
  revalidatePath("/dashboard");
}
