import { Challenge } from "@prisma/client";
import { prisma } from "./(root)/prisma";
import { addDays } from "date-fns";

export type CreateChallengeInput = Omit<
  Challenge,
  "id" | "createdAt" | "updatedAt" | "startDate" | "endDate"
>;
export const createChallenge = async (
  challengeInformation: CreateChallengeInput
) => {
  const data = await prisma.challenge.create({
    data: {
      ...challengeInformation,
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
    },
  });

  return data;
};

export type UpdateChallengeInput = Omit<
  Challenge,
  "userId" | "createdAt" | "updatedAt" | "startDate" | "endDate"
>;
export const updateChallenge = async (
  challengeInformation: UpdateChallengeInput
) => {
  const data = await prisma.challenge.update({
    where: { id: challengeInformation.id },
    data: challengeInformation,
  });

  return data;
};

export const getChallenges = async (userId: string) => {
  const data = await prisma.challenge.findMany({
    where: { userId: userId },
    orderBy: { startDate: "desc" },
  });

  return data;
};
