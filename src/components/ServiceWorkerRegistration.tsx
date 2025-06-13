"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker
      registerSW();
    }
  }, []);

  async function registerSW() {
    try {
      console.log("Registering service worker...");

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      console.log("Service Worker registered successfully:", registration);

      // Handle service worker updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New service worker available");
              // You could show a toast here to prompt user to refresh
            }
          });
        }
      });

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Message from service worker:", event.data);
      });
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  // This component doesn't render anything
  return null;
}
