"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Neautentificat");

  const name = String(formData.get("name") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();

  if (!name) throw new Error("Numele este obligatoriu");

  await prisma.player.update({
    where: { clerkUserId: userId },
    data: { name, position: position || null },
  });

  revalidatePath("/profil");
  revalidatePath("/dashboard");
}
