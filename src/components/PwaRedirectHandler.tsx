"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { usePwa } from "@/hooks/use-pwa";

export default function PwaRedirectHandler() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const { isPwa, isClient } = usePwa();

  useEffect(() => {
    if (isLoaded && isSignedIn && isClient) {
      if (isPwa) {
        router.push("/app");
      }
    }
  }, [isLoaded, isSignedIn, isClient, isPwa, router]);

  return null;
}
