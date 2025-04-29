"use client";

import { DevDialog } from "@/components/DevDialog";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { trpc, trpcClient } from "@/lib/util/trpc";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

export const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-1">{children}</main>
    </>
  );
}
