import { use } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUp, SignIn } from "@clerk/nextjs";
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
  searchParams,
}: {
  params: { challengeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = await auth();
  const { challengeId } = params;
  const type = searchParams?.type;

  if (userId) {
    redirect(`/app/join/${challengeId}`);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-md mb-5 text-gray-500">
        You&apos;ve been invited to join a challenge.
      </p>
      {type === "sign-in" ? (
        <SignIn
          forceRedirectUrl={`/app/join/${challengeId}`}
          signUpUrl={`/join/${challengeId}?type=sign-up`}
          routing="hash"
        />
      ) : (
        <SignUp
          forceRedirectUrl={`/app/join/${challengeId}`}
          signInUrl={`/join/${challengeId}?type=sign-in`}
          routing="hash"
        />
      )}
    </div>
  );
}
