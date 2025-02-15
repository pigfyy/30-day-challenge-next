import { PageLayout } from "@/components/layout/PageLayout";
import { getChallenge } from "@/lib/db/challenge";

type GenerateMetadataProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata(props: GenerateMetadataProps) {
  const searchParams = await props.searchParams;
  const challengeId = searchParams.challenge;

  if (challengeId === "new") {
    return {
      title: "Create Challenge - 30 Day Me",
    };
  }

  if (!challengeId || typeof challengeId !== "string") {
    return {
      title: "30 Day Me",
    };
  }
  const challenge = await getChallenge(challengeId);

  return {
    title: challenge ? `${challenge.title} - 30 Day Me` : "30 Day Me",
  };
}

export default function Page() {
  return <PageLayout />;
}
