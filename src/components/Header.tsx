"use client";

import { Button } from "@/components/ui/button";
import { useClient } from "@/hooks/use-client";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { ShieldUser, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { authClient } from "@/lib/auth-client";

const AdminFeatureToggles = () => {
  const { data: isAdmin, isLoading } = trpc.user.query.isAdmin.useQuery();
  const { isNewTheme, toggleTheme } = useTheme();

  if (!isAdmin || isLoading) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="text-gray-700">
          <ShieldUser />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Admin Feature Toggles</h4>
            <p className="text-muted-foreground text-sm">
              Try new features before they are available to the public.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="new-theme"
              checked={isNewTheme}
              onCheckedChange={toggleTheme}
            />
            <Label htmlFor="new-theme">New Theme</Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Branding = () => {
  const { removeQueryParam } = useUrlState();
  const pathname = usePathname();
  const isClient = useClient();

  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      onNavigate={(e) => {
        if (
          !isClient &&
          (pathname === "/app" || pathname.startsWith("/app/"))
        ) {
          e.preventDefault();
          removeQueryParam("challenge");
        }
      }}
    >
      <Image
        src={"/logo.png"}
        alt="30 Day Challenge Logo"
        width={36}
        height={36}
        className="rounded-md"
      />
      <div className="text-xl font-bold text-gray-900">30 Day Me</div>
    </Link>
  );
};

const UserButton = () => {
  const session = authClient.useSession();

  if (!session.data) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="text-gray-700">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Profile</h4>
            {session.data.user?.email && (
              <p className="text-muted-foreground text-sm">
                {session.data.user.email}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const Header = () => {
  const session = authClient.useSession();
  const isClient = useClient();

  console.log("session", session);

  return (
    <header className="w-full border-b shadow-xs">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-6 py-4 md:w-2/3">
        <Branding />
        <div className="flex items-center space-x-4">
          {!isClient || session.isPending || !session.data ? (
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
            >
              <Button variant="outline" className="text-gray-700">
                Sign In
              </Button>
            </Link>
          ) : (
            <>
              <UserButton />
              <AdminFeatureToggles />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
