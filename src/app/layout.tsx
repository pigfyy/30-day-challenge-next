"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { DevDialog } from "@/components/DevDialog";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/util/trpc";
import superjson from "superjson";
import { trpcClient } from "@/lib/util/trpc";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

export const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider>
          <html lang="en">
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>30 Day Me</title>
              <link rel="icon" href="/favicon.svg" />
            </head>
            <body className="flex min-h-screen flex-col bg-gray-50">
              <Header />
              <SignedIn>
                <main className="flex flex-1">{children}</main>
              </SignedIn>
              <SignedOut>
                <main className="flex flex-1 items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome to 30 Day Me</h1>
                    <p className="text-gray-700">
                      Sign in to start your journey towards a healthier life.
                    </p>
                  </div>
                </main>
              </SignedOut>
              <Toaster />
              {/* DEVELOPER TOOLS */}
              <DevDialog />
            </body>
          </html>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
