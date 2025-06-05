import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getChallengeIdea } from "@/lib/db/challengeIdeas";
import JoinAuthPageLayout from "@/components/layout/JoinAuthPageLayout";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = { title: "Join Challenge - 30 Day Me" };

export default async function JoinChallengePage({
  params,
  searchParams,
}: {
  params: Promise<{ challengeId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { challengeId } = await params;
  const type = (await searchParams)?.type;

  if (session) {
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
