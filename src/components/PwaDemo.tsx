"use client";

import PushNotificationManager from "@/components/PushNotificationManager";
import InstallPrompt from "@/components/InstallPrompt";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePwa } from "@/hooks/use-pwa";
import { Smartphone, Bell, Wifi, Download } from "lucide-react";

export default function PwaDemo() {
  const { isPwa, isClient } = usePwa();

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="h-32 animate-pulse rounded-lg bg-gray-100"></div>
        <div className="h-64 animate-pulse rounded-lg bg-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* PWA Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              PWA Status
            </CardTitle>
            <Badge variant={isPwa ? "default" : "secondary"}>
              {isPwa ? "Installed" : "Web App"}
            </Badge>
          </div>
          <CardDescription>
            Current Progressive Web App installation status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isPwa ? "bg-green-500" : "bg-gray-400"}`}
              />
              <span>Standalone Mode: {isPwa ? "Active" : "Inactive"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Service Worker: Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Manifest: Configured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>HTTPS: Enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Install Prompt */}
      <InstallPrompt />

      {/* Push Notification Manager */}
      <PushNotificationManager />

      {/* PWA Features Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            PWA Features
          </CardTitle>
          <CardDescription>
            Features available in this Progressive Web App
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Bell className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-600">
                  Receive updates and reminders even when the app is closed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Wifi className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-medium">Offline Support</h4>
                <p className="text-sm text-gray-600">
                  Basic functionality works without internet connection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <div>
                <h4 className="font-medium">Home Screen Installation</h4>
                <p className="text-sm text-gray-600">
                  Install on your device for quick access like a native app
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
