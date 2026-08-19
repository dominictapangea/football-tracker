import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";

export async function getCurrentPlayer() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    return await prisma.player.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: {
        clerkUserId: userId,
        name: await defaultPlayerName(),
      },
    });
  } catch (error) {
    // Two concurrent requests (e.g. dev-mode double render) can both miss
    // the row and race on create; the loser just re-fetches what won.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return prisma.player.findUniqueOrThrow({ where: { clerkUserId: userId } });
    }
    throw error;
  }
}

async function defaultPlayerName() {
  const user = await currentUser();
  return user?.fullName || user?.firstName || user?.username || "Jucător";
}
