"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PwaRedirectHandler() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const isPwa = window.matchMedia("(display-mode: standalone)").matches;
      // Simple check for mobile width, adjust threshold as needed
      const isMobile = window.innerWidth < 768;

      if (isPwa && isMobile) {
        router.push("/app");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  // This component doesn't render anything visual
  return null;
}
