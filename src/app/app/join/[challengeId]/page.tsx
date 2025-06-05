import JoinPageLayout from "@/components/layout/JoinPageLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Join Challenge - 30 Day Me",
};

export default async function JoinChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { challengeId } = await params;

  if (!session) {
    redirect(`/join/${challengeId}`);
  }

  return <JoinPageLayout challengeId={challengeId} />;
}
