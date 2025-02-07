import { CreateChallenge } from "@/components/ChallengeForms";
import { ChallengeListGrid } from "@/components/ChallengeListGrid";
import { ViewChallenge } from "@/components/ViewChallenge";
import { CGetChallenges } from "@/lib/db/challenge";
import { CFindUserByClerkId } from "@/lib/db/user";
import { auth } from "@clerk/nextjs/server";

type ChallengePageProps = {
  searchParams?: Promise<{
    challenge?: string;
  }>;
};

const Challenges = async ({
  pageProps: props,
}: {
  pageProps: ChallengePageProps;
}) => {
  const challengeId = (await props.searchParams)?.challenge;

  const { userId: clerkId } = await auth();
  const user = await CFindUserByClerkId(clerkId!);

  const challenges = await CGetChallenges(user.id);

  const currentChallenge = challenges.find((c) => c.id === challengeId);

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  return (
    <>
      {currentChallenge ? (
        <ViewChallenge challenge={currentChallenge} />
      ) : (
        <ChallengeListGrid challenges={challenges} />
      )}
    </>
  );
};

export default async function Page(props: ChallengePageProps) {
  return (
    <div className="my-6 flex flex-1 items-center justify-center">
      <Challenges pageProps={props} />
    </div>
  );
}
