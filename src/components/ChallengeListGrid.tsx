"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming you have a Card component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusCircle } from "lucide-react"; // Or any other suitable icon

interface Challenge {
  id: string;
  title: string;
  wish: string;
  dailyAction: string;
  icon: React.ReactNode;
}

export const ChallengeListGrid = ({
  challenges,
}: {
  challenges: Challenge[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleViewClick = (challengeId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("challenge", challengeId);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCreateChallengeClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("challenge", "new"); // Use a special keyword like "new"
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Create Challenge Card */}
        <Card
          className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
          onClick={handleCreateChallengeClick}
        >
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
              <PlusCircle /> {/* Add icon */}
            </div>
            <CardTitle className="text-lg font-semibold">
              Create New Challenge
            </CardTitle>
            <CardDescription className="text-base text-foreground">
              Start a new personalized challenge.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <p className="text-base text-muted-foreground">
              Define your goals and track your progress.
            </p>
          </CardContent>
          <CardFooter className="mt-4">
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Existing Challenge Cards */}
        {challenges.map((challenge) => (
          <Card
            key={challenge.id} // Removed crypto.randomUUID() from key.  This was the main issue.
            className="transition-shadow duration-200 hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                {challenge.icon}
              </div>
              <CardTitle className="text-lg font-semibold">
                {challenge.title}
              </CardTitle>
              <CardDescription className="text-base text-foreground">
                {challenge.wish}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="text-base text-muted-foreground">
                {challenge.dailyAction}
              </p>
            </CardContent>
            <CardFooter className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleViewClick(challenge.id)}
              >
                View Challenge
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
