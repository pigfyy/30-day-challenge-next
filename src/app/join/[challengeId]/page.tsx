import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChallengeIdea } from "@/lib/db/challengeIdeas";
import JoinAuthPageLayout from "@/components/layout/JoinAuthPageLayout";

export async function generateMetadata({
  params,
}: {
  params: { challengeId: string };
}) {
  return { title: `Join Challenge - 30 Day Me` };
}

export default async function JoinChallengePage({
  params,
  searchParams,
}: {
  params: Promise<{ challengeId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  const { challengeId } = await params;
  const type = (await searchParams)?.type;

  if (userId) {
    redirect(`/app/join/${challengeId}`);
  }

  const challenge = await getChallengeIdea(challengeId);
  const organizationName = challenge?.organization;

  return (
    <JoinAuthPageLayout
      challengeId={challengeId}
      organizationName={organizationName}
      type={type}
    />
  );
}
