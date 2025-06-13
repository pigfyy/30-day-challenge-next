"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Connection Status Badge */}
      <div className="fixed top-4 right-4 z-50">
        <Badge
          variant={isOnline ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          {isOnline ? (
            <>
              <Wifi className="h-3 w-3" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Offline
            </>
          )}
        </Badge>
      </div>

      {/* Offline Alert */}
      {!isOnline && (
        <Alert className="mb-4 border-amber-200 bg-amber-50">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You&apos;re currently offline. Some features may be limited, but you
            can still browse cached content.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
