"use client";

import { DevDialog } from "@/components/DevDialog";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { trpc, trpcClient } from "@/lib/util/trpc";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Suspense } from "react";

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
              <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="flex min-h-screen flex-col bg-gray-50">
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SignedIn>
                  <main className="flex flex-1">{children}</main>
                </SignedIn>
                <SignedOut>
                  <main className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold">
                        Welcome to 30 Day Me
                      </h1>
                      <p className="text-gray-700">
                        Sign in to start your journey towards a healthier life.
                      </p>
                    </div>
                  </main>
                </SignedOut>
                <Toaster />
                {/* DEVELOPER TOOLS */}
                <DevDialog />
              </Suspense>
            </body>
          </html>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
