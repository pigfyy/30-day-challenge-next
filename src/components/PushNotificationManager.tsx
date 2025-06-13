"use client";

import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Bell, BellOff, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerSW();
    }
  }, []);

  async function registerSW() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });

      // Convert PushSubscription to plain object for Server Action
      const subscriptionData = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.getKey("p256dh")
            ? arrayBufferToBase64(sub.getKey("p256dh")!)
            : "",
          auth: sub.getKey("auth")
            ? arrayBufferToBase64(sub.getKey("auth")!)
            : "",
        },
      };

      setSubscription(sub);
      await subscribeUser(subscriptionData);
      toast({
        title: "Success!",
        description: "You have successfully subscribed to push notifications.",
      });
    } catch (error) {
      console.error("Push subscription failed:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe to push notifications.",
        variant: "destructive",
      });
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
      toast({
        title: "Unsubscribed",
        description: "You have been unsubscribed from push notifications.",
      });
    } catch (error) {
      console.error("Unsubscribe failed:", error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe from push notifications.",
        variant: "destructive",
      });
    }
  }

  async function sendTestNotification() {
    if (subscription && message.trim()) {
      try {
        await sendNotification(message);
        setMessage("");
        toast({
          title: "Notification sent!",
          description: "Check your notifications to see the test message.",
        });
      } catch (error) {
        console.error("Send notification failed:", error);
        toast({
          title: "Error",
          description: "Failed to send notification.",
          variant: "destructive",
        });
      }
    }
  }

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Push notifications are not supported in this browser.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Push Notifications</CardTitle>
        <CardDescription>
          Subscribe to receive push notifications from 30 Day Challenge
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {subscription ? (
            <Button
              onClick={unsubscribeFromPush}
              variant="outline"
              className="w-full"
            >
              <BellOff className="mr-2 h-4 w-4" />
              Unsubscribe from Push Notifications
            </Button>
          ) : (
            <Button onClick={subscribeToPush} className="w-full">
              <Bell className="mr-2 h-4 w-4" />
              Subscribe to Push Notifications
            </Button>
          )}
        </div>

        {subscription && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="message">Test Notification Message</Label>
              <Input
                id="message"
                type="text"
                placeholder="Enter a test message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              onClick={sendTestNotification}
              disabled={!message.trim()}
              variant="secondary"
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Test Notification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
