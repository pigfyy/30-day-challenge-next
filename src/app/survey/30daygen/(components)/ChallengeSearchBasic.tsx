"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpandableText from "@/components/ui/expandable-text";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeIdeaResult } from "@/lib/db/challengeIdeas";
import { trpc } from "@/lib/util/trpc";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import React from "react";

const ChallengeIdea = ({
  challengeIdea,
}: {
  challengeIdea: ChallengeIdeaResult;
}) => {
  return (
    <Card
      key={challengeIdea.id}
      className="transition-shadow duration-300 hover:shadow-xl"
    >
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          {challengeIdea.title}
        </CardTitle>
        <CardDescription>
          <ExpandableText text={challengeIdea.description} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Wish: </span>
          {challengeIdea.wish}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Daily Action: </span>
          {challengeIdea.dailyAction}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Source: </span>
          <a
            href={challengeIdea.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {challengeIdea.sourceName}
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export const ChallengeSearchBasic = ({
  leftCardHeight,
  externalQuery,
}: {
  leftCardHeight: number;
  externalQuery?: string;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChallengeIdeaResult[]>([]);

  const {
    mutateAsync: searchChallenges,
    isPending: isSearchChallengesPending,
  } = trpc.challengeIdea.search.useMutation();

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    const response = await searchChallenges(searchQuery);
    setResults(response);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await performSearch(query);
  };

  // Handle external query changes
  useEffect(() => {
    if (externalQuery) {
      setQuery(externalQuery);
      performSearch(externalQuery);
    }
  }, [externalQuery]);

  return (
    <Card
      className="flex w-full flex-col"
      style={{
        height: !(results.length || isSearchChallengesPending)
          ? "auto"
          : leftCardHeight,
      }}
    >
      <CardContent
        className={`flex h-full w-full flex-col items-center justify-center p-0 pt-6 ${!results.length && !isSearchChallengesPending ? "pb-6" : ""}`}
      >
        {!results.length && !isSearchChallengesPending && (
          <CardHeader className="w-full pb-3 text-left">
            <CardTitle>Find Challenges</CardTitle>
            <CardDescription>
              Looking for inspiration? Find challenge ideas to kickstart your
              journey to a healthier lifestyle.
            </CardDescription>
          </CardHeader>
        )}

        <form onSubmit={handleSubmit} className="mb-1 flex w-full gap-2 px-6">
          <Input
            placeholder="Search challenges..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>

        {(results.length || isSearchChallengesPending) && (
          <ScrollArea className="flex h-full w-full flex-col items-center justify-center px-6">
            {!isSearchChallengesPending ? (
              <>
                <div className="mb-4 w-full text-left">
                  <span className="text-sm font-medium text-neutral-500">
                    {results.length} result{results.length !== 1 && "s"} found
                  </span>
                </div>
                <div className="mb-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                  {results.map((result) => (
                    <ChallengeIdea key={result.id} challengeIdea={result} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 mt-1.5 w-full text-left">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="mb-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                    >
                      <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="mt-2 h-4 w-full" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
