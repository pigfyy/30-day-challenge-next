"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";
import { usePwa } from "@/hooks/use-pwa";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const { isPwa } = usePwa();

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    setIsStandalone(isStandaloneMode);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener,
      );
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const handleIOSInstall = () => {
    setShowIOSPrompt(true);
  };

  // Don't show prompt if already installed as PWA
  if (isPwa || isStandalone) {
    return null;
  }

  return (
    <>
      {/* Standard install prompt for supported browsers */}
      {installPrompt && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <CardTitle className="text-lg">Install App</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInstallPrompt(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Install 30 Day Challenge for a better experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleInstallClick} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Install App
            </Button>
          </CardContent>
        </Card>
      )}

      {/* iOS install prompt */}
      {isIOS && !installPrompt && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                <CardTitle className="text-lg">Install App</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIOSPrompt(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Add 30 Day Challenge to your home screen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleIOSInstall} className="w-full">
              <Share className="mr-2 h-4 w-4" />
              Install on iOS
            </Button>
          </CardContent>
        </Card>
      )}

      {/* iOS installation instructions */}
      {showIOSPrompt && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Share className="h-5 w-5" />
                Install Instructions
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIOSPrompt(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                To install this app on your iOS device:
              </p>
              <ol className="list-inside list-decimal space-y-1 text-gray-600">
                <li>
                  Tap the <strong>Share</strong> button at the bottom of the
                  screen
                </li>
                <li>
                  Scroll down and tap{" "}
                  <strong>&ldquo;Add to Home Screen&rdquo;</strong>
                </li>
                <li>
                  Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner
                </li>
              </ol>
              <p className="mt-3 text-xs text-gray-500">
                The app will then appear on your home screen like a native app.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
