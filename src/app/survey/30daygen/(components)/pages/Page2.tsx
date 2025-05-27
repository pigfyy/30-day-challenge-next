"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChallengeSearchBasic } from "../ChallengeSearchBasic";

export const Page2 = () => {
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
              challenges towards your goals. Please make at least 3 search
              queries using the embedded UI below to familiarize yourself with
              the system.
            </p>
          </CardContent>
        </Card>

        {/* Embedded Search UI */}
        <ChallengeSearchBasic leftCardHeight={600} />
      </div>
    </div>
  );
};
