import { Form } from "@/components/Form";
import { getChallengeIdeas } from "@/lib/db/challengeIdeas";
import React, { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) => {
  const queryString = (await props.searchParams)?.query;

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
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
    <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {queryString && challengeIdeas.length === 0 ? (
        <div className="col-span-full w-full rounded-lg border border-red-200 bg-red-50 p-6 text-center font-semibold text-red-600 shadow-sm transition-shadow duration-300 hover:shadow-md">
          No challenge ideas found for the given query.
        </div>
      ) : (
        challengeIdeas.map((idea) => (
          <div
            key={idea.id}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {idea.title}
              </h2>
              <p className="mb-4 text-gray-600">{idea.description}</p>
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
        ))
      )}
    </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="p-6">
            <div className="mb-4 h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
