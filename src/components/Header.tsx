"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/hooks/use-url-state";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { removeQueryParam } = useUrlState();
  const pathname = usePathname();

  const resetChallengeId = () => {
    removeQueryParam("challenge");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {pathname === "/app" ? (
          <button
            onClick={resetChallengeId}
            className="flex items-center gap-3"
          >
            <Image
              src={"/logo.png"}
              alt="30 Day Challenge Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <div className="text-xl font-bold text-gray-900">30 Day Me</div>
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="30 Day Challenge Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <div className="text-xl font-bold text-gray-900">30 Day Me</div>
          </Link>
        )}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
            >
              <Button variant="outline" className="text-gray-700">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
