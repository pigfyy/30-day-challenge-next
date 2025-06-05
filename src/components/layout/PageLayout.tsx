"use client";

import { Home } from "@/components/Home";
import { CreateChallenge } from "@/components/molecule/challenge-form/CreateChallenge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ViewChallenge } from "@/components/ViewChallenge";
import { useUrlState } from "@/hooks/use-url-state";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const Challenges = () => {
  const { getQueryParam } = useUrlState();

  const challengeId = getQueryParam("challenge");

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <Home />;
  }

  return <ViewChallenge />;
};

export function PageLayout() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user?.id) {
      router.push("/sign-in");
    }
  }, [isPending, session?.user?.id, router]);

  return (
    <>
      <div className="my-6 flex flex-1 items-center justify-center">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <Challenges />
        </Suspense>
      </div>
    </>
  );
}
