import { PageLayout } from "@/components/layout/PageLayout";

type GenerateMetadataProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps) {
  const challenge = searchParams.challenge;

  return {
    title: challenge ? `Challenge: ${challenge}` : "Default Title",
  };
}

export default function Page() {
  return <PageLayout />;
}
