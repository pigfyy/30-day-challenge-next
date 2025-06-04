"use client";

import { DevDialog } from "@/components/DevDialog";
import { Header } from "@/components/Header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { queryClient } from "@/lib/util/queryClient";
import { trpc, trpcClient } from "@/lib/util/trpc";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider afterSignOutUrl="/">
          <ThemeProvider defaultTheme={false}>
            <html lang="en">
              <head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <meta name="overscroll-behavior" content="none" />
                <link rel="icon" href="/favicon.ico" />
                <title>30 Day Me</title>
                <meta
                  name="description"
                  content="30 Day Me is a platform for creating and tracking 30-day challenges."
                />
              </head>
              <body
                className={`${quicksand.className} bg-background-darker flex min-h-screen flex-col`}
              >
                <ThemeWrapper>
                  <PostHogProvider>
                    <Suspense
                      fallback={
                        <div className="flex h-screen w-full items-center justify-center">
                          <LoadingSpinner />
                        </div>
                      }
                    >
                      <Header />
                      <SignedIn>
                        <main className="flex flex-1">{children}</main>
                      </SignedIn>
                      <SignedOut>
                        <main className="flex flex-1">{children}</main>
                      </SignedOut>
                      <Toaster />
                      {/* DEVELOPER TOOLS */}
                      <DevDialog />
                      <Analytics />
                    </Suspense>
                  </PostHogProvider>
                </ThemeWrapper>
              </body>
            </html>
          </ThemeProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
