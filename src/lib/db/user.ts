import { User } from "@/lib/db/types";
import { prisma } from "./(root)/prisma";
import { cache } from "react";

export const findUserByClerkId = async (clerkId: string) => {
  const data = await prisma.user.findUnique({ where: { clerkId: clerkId } });
  if (!data) throw Error(`User with clerkId ${clerkId} not found`);
  return data;
};

export const createUser = async (userInformation: User) => {
  const data = await prisma.user.create({ data: userInformation });
  return data;
};

export const deleteUser = async (clerkId: string) => {
  const userId = await findUserByClerkId(clerkId);
  await prisma.dailyProgress.deleteMany({ where: { userId: userId.id } });
  await prisma.challenge.deleteMany({ where: { userId: userId.id } });
  await prisma.user.delete({ where: { id: userId.id } });
};
