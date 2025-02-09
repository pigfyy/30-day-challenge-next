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

const Header: React.FC = () => (
  <header className="w-full border-b bg-white shadow-sm">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="text-lg font-semibold text-gray-900">Break it Down</div>
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col bg-gray-50">
          <Header />
          <SignedIn>
            <main className="flex flex-1">{children}</main>
          </SignedIn>
          <SignedOut>
            <main className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  Welcome to the 30 Day Challenge
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
        </body>
      </html>
    </ClerkProvider>
  );
}
