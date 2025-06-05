"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePwa } from "@/hooks/use-pwa";
import { authClient } from "@/lib/auth-client";

export default function PwaRedirectHandler() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const { isPwa, isClient } = usePwa();

  useEffect(() => {
    if (!isPending && session && isClient) {
      if (isPwa) {
        router.push("/app");
      }
    }
  }, [isPending, session, isClient, isPwa, router]);

  return null;
}
