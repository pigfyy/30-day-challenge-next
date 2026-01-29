"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo.png"
              alt="30 Day Me"
              width={80}
              height={80}
              className="rounded-xl"
            />
            <h1 className="text-foreground mt-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              Build habits that stick.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              Pick a 30-day challenge. Show up daily. Track your progress with
              photos. Simple as that.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg">Start a challenge</Button>
              </Link>
              <Button size="lg" variant="outline" onClick={scrollToHowItWorks}>
                See how it works
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-muted-foreground text-sm">
                Also available on
              </span>
              <Link
                href="https://apps.apple.com/us/app/30-day-me/id6755921080"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/download_on_app_store.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-9 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="border-border bg-muted w-full border-t py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground text-center text-2xl font-bold sm:text-3xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="bg-foreground text-background mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                1
              </div>
              <h3 className="text-foreground mt-4 font-semibold">
                Pick a challenge
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Browse ideas or create your own. Cold showers, daily sketching,
                no sugar - whatever you want to commit to.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-foreground text-background mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                2
              </div>
              <h3 className="text-foreground mt-4 font-semibold">
                Show up daily
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Mark each day complete. Add a photo if you want - seeing your
                progress pile up is surprisingly motivating.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-foreground text-background mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                3
              </div>
              <h3 className="text-foreground mt-4 font-semibold">
                Build the habit
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                30 days is enough to rewire your defaults. After that, it&apos;s
                just who you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="w-full py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground text-center text-2xl font-bold sm:text-3xl">
            See it in action
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-center">
            A dashboard that shows your progress at a glance. No clutter, no
            distractions.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="border-border overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src="/dashboard-demo.webp"
                  alt="Dashboard showing active challenges"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                Your challenges at a glance
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-border overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src="/trackdemo.webp"
                  alt="Tracking daily progress"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                Mark days complete, add photos
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-border overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src="/createdemo.webp"
                  alt="Creating a new challenge"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                Create or browse challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-border bg-muted w-full border-t py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
            Ready to try it?
          </h2>
          <p className="text-muted-foreground mt-3">
            Pick something you&apos;ve been putting off. Give it 30 days.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg">Start your first challenge</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border w-full border-t py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left - Logo and name */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="30 Day Me"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-foreground font-semibold">30 Day Me</span>
            </div>

            {/* Middle - Links */}
            <div className="text-muted-foreground flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>

            {/* Right - App Store and Social */}
            <div className="flex items-center gap-4">
              <Link
                href="https://apps.apple.com/us/app/30-day-me/id6755921080"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/download_on_app_store.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <Link
                href="https://www.instagram.com/30day.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
