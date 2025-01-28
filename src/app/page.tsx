import { Form } from "@/lib/components/Form";
import { getChallengeIdeas } from "@/lib/db/challengeIdeas";
import React, { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const queryString = (await props.searchParams)?.query;

  return (
    <div className="flex items-center justify-center w-full flex-col p-4">
      <Form />
      <Suspense key={queryString} fallback={<SkeletonLoader />}>
        <ChallengeIdeasDisplay queryString={queryString} />
      </Suspense>
    </div>
  );
};

async function ChallengeIdeasDisplay({
  queryString,
}: {
  queryString: string | undefined;
}) {
  const challengeIdeas = queryString
    ? await getChallengeIdeas(queryString)
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
      {challengeIdeas.map((idea) => (
        <div
          key={idea.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {idea.title}
            </h2>
            <p className="text-gray-600 mb-4">{idea.description}</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Wish:</span> {idea.wish}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Daily Action:</span>{" "}
                {idea.dailyAction}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Source:</span>{" "}
                <a
                  href={idea.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {idea.sourceName}
                </a>
              </p>
              {idea.score !== undefined && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Score:</span> {idea.score}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
        >
          <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
