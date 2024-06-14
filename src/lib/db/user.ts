import { User } from "@prisma/client";
import { prisma } from "./(root)/prisma";

export const findUserByClerkId = async (clerkId: string) => {
  const data = await prisma.user.findUnique({ where: { clerkId: clerkId } });
  if (!data) throw Error(`User with clerkId ${clerkId} not found`);
  return data;
};

export const createUser = async (userInformation: User) => {
  const data = await prisma.user.create({ data: userInformation });
  return data;
};
