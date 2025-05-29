"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChallengeSearchBasic } from "../ChallengeSearchBasic";
import { type Page2Props } from "../../types";

export const Page2 = ({ onSearchQuery, isTurk }: Page2Props) => {
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const exampleQueries = [
    "I want to procrastinate less.",
    "I've been feeling tired, how can I feel more energized throughout the day?",
    "How can I lose weight?",
  ];

  const handleTryQuery = (query: string) => {
    setCurrentQuery(query);
    // Reset and set again to trigger useEffect in ChallengeSearchBasic
    setTimeout(() => setCurrentQuery(query), 0);
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            AI Search System Demo
          </h1>
        </div>

        {/* Instructions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-gray-700">
              We have created an AI search system aimed to help you generate
              challenges towards your goals. Please make at least{" "}
              {isTurk ? "5" : "3"} search queries using the embedded UI below to
              familiarize yourself with the system.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Here are some example queries to get you started:
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {exampleQueries.map((query, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex-1 rounded-md bg-gray-100 px-3 py-2 font-mono text-base text-gray-700">
                    &ldquo;{query}&rdquo;
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTryQuery(query)}
                    className="whitespace-nowrap"
                  >
                    Try it
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Embedded Search UI */}
        <ChallengeSearchBasic
          leftCardHeight={600}
          externalQuery={currentQuery}
          onSearchQuery={onSearchQuery}
        />

        {/* Transition Message */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <p className="text-lg font-medium text-blue-900">
                Ready for the next step?
              </p>
              <p className="mt-2 text-base leading-relaxed text-blue-700">
                Once you&apos;ve explored the search system with at least{" "}
                {isTurk ? "5" : "3-5"} queries, proceed to the next section
                where you&apos;ll share your feedback about your experience with
                the AI search functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
