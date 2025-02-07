import { Challenge } from "@prisma/client";

export const ChallengeListGrid = async ({
  challenges,
}: {
  challenges: Challenge[];
}) => {
  return <div>Challenge List grid</div>;
};
