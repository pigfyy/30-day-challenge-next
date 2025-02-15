"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const resetChallengeId = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("challenge");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={resetChallengeId}>
            <Image
              src={"/logo.png"}
              alt="30 Day Challenge Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
          </button>
          <div className="text-xl font-bold text-gray-900">30 Day Me</div>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="text-gray-700">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
