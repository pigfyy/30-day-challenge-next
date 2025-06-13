"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflineTest() {
  const testOffline = () => {
    // Open offline.html directly to test
    window.open("/offline.html", "_blank");
  };

  const forceRefresh = () => {
    // Force a hard refresh to clear any cached content
    window.location.reload();
  };

  const testServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker ready:", registration);

        // Get all caches
        const cacheNames = await caches.keys();
        console.log("Available caches:", cacheNames);

        // Check if offline.html is cached
        const cache = await caches.open("30-day-challenge-v3");
        const offlineResponse = await cache.match("/offline.html");
        console.log("Offline page cached:", !!offlineResponse);

        alert(
          `SW Ready: ${!!registration}\nCaches: ${cacheNames.length}\nOffline page: ${!!offlineResponse}`,
        );
      } catch (error) {
        console.error("Service Worker test failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        alert("Service Worker test failed: " + errorMessage);
      }
    } else {
      alert("Service Workers not supported");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WifiOff className="h-5 w-5" />
          Offline Testing Tools
        </CardTitle>
        <CardDescription>
          Test offline functionality step by step
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          <Button onClick={testServiceWorker} variant="outline">
            Test Service Worker Status
          </Button>

          <Button onClick={testOffline} variant="outline">
            <WifiOff className="mr-2 h-4 w-4" />
            Test Offline Page Directly
          </Button>

          <Button onClick={forceRefresh} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Force Hard Refresh
          </Button>
        </div>

        <div className="space-y-1 border-t pt-3 text-xs text-gray-600">
          <p>
            <strong>Step 1:</strong> Click &ldquo;Test Service Worker
            Status&rdquo;
          </p>
          <p>
            <strong>Step 2:</strong> Open DevTools → Network → Check
            &ldquo;Offline&rdquo;
          </p>
          <p>
            <strong>Step 3:</strong> Refresh the page (F5)
          </p>
          <p>
            <strong>Expected:</strong> Should show offline.html page
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
