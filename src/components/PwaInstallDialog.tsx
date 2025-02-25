"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Smartphone } from "lucide-react";

interface PwaInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PwaInstallDialog({
  open,
  onOpenChange,
}: PwaInstallDialogProps) {
  // Detect browser to show appropriate instructions
  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid =
    typeof navigator !== "undefined" && /Android/.test(navigator.userAgent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Install 30 Day Challenge App
          </DialogTitle>
          <DialogDescription>
            Install this app on your device for a better experience.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {isIOS && (
            <div className="space-y-2">
              <h3 className="font-medium">iOS Installation:</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Tap the <span className="font-semibold">Share</span> button in
                  Safari
                </li>
                <li>
                  Scroll down and tap{" "}
                  <span className="font-semibold">Add to Home Screen</span>
                </li>
                <li>
                  Tap <span className="font-semibold">Add</span> in the
                  top-right corner
                </li>
              </ol>
            </div>
          )}

          {isAndroid && (
            <div className="space-y-2">
              <h3 className="font-medium">Android Installation:</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Tap the menu icon (three dots) in Chrome</li>
                <li>
                  Tap <span className="font-semibold">Add to Home Screen</span>
                </li>
                <li>
                  Tap <span className="font-semibold">Add</span> when prompted
                </li>
              </ol>
            </div>
          )}

          {!isIOS && !isAndroid && (
            <div className="space-y-2">
              <h3 className="font-medium">Installation:</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Click the install icon in your browser&apos;s address bar
                </li>
                <li>Follow the on-screen instructions to install</li>
              </ol>
            </div>
          )}

          <div className="rounded-md bg-muted p-3 text-sm">
            <p>Installing as a PWA allows you to:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Use the app offline</li>
              <li>Get a full-screen experience</li>
              <li>Access from your home screen</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
