import { use } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  return { title: `Join Challenge - 30 Day Me` };
}

export default async function JoinChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  // check auth
  const { userId } = await auth();
  const { challengeId } = await params;

  if (userId) {
    redirect(`/app/join/${challengeId}`);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-md text-gray-500">
        You&apos;ve been invited to join a challenge.
      </p>
      <SignInButton forceRedirectUrl={`/app/join/${challengeId}`}>
        <Button size="lg" className="mt-4">
          Join Challenge
        </Button>
      </SignInButton>
    </div>
  );
}
