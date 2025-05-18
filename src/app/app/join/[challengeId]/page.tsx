import JoinPageLayout from "@/components/layout/JoinPageLayout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function JoinChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { userId } = await auth();
  const { challengeId } = await params;

  if (!userId) {
    redirect(`/join/${challengeId}`);
  }

  return <JoinPageLayout challengeId={challengeId} />;
}
