import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function getCurrentPlayer() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const player = await prisma.player.upsert({
    where: { clerkUserId: userId },
    update: {},
    create: {
      clerkUserId: userId,
      name: await defaultPlayerName(),
    },
  });

  return player;
}

async function defaultPlayerName() {
  const user = await currentUser();
  return user?.fullName || user?.firstName || user?.username || "Jucător";
}
