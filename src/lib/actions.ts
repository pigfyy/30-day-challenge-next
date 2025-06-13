"use server";

import { challenge, dailyProgress, db } from "@/lib/db/drizzle";
import { Challenge } from "@/lib/db/drizzle/zod";
import { and, eq, gt, lt, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import webpush from "web-push";
import { uploadImage } from "./db/dailyProgress";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

webpush.setVapidDetails(
  "mailto:franklinzhang06@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

interface WebPushSubscription extends PushSubscription {
  keys: {
    p256dh: string;
    auth: string;
  };
}

let subscription: WebPushSubscription | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString("base64");
}

export async function subscribeUser(sub: PushSubscription) {
  const p256dh = sub.getKey("p256dh");
  const auth = sub.getKey("auth");

  if (!p256dh || !auth) {
    throw new Error("Invalid subscription: missing p256dh or auth keys");
  }

  const webPushSubscription: WebPushSubscription = {
    ...sub,
    keys: {
      p256dh: arrayBufferToBase64(p256dh),
      auth: arrayBufferToBase64(auth),
    },
  };

  subscription = webPushSubscription;
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "30 Day Challenge",
        body: message,
        icon: "/pwa-icons/android/android-launchericon-192-192.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

export async function handleDailyProgressImageUpload(file: File) {
  const url = await uploadImage(file, "progress-image.png");

  return url;
}

// FOR DEV DIALOG
export async function deleteDailyProgressAction(challengeId: string) {
  await db
    .delete(dailyProgress)
    .where(eq(dailyProgress.challengeId, challengeId));

  revalidatePath("/");
}

export async function changeDates(
  challengeData: Challenge,
  startDateObj: Date,
  endDateObj: Date,
) {
  await db
    .update(challenge)
    .set({
      startDate: startDateObj,
      endDate: endDateObj,
    })
    .where(eq(challenge.id, challengeData.id));

  await db
    .delete(dailyProgress)
    .where(
      and(
        eq(dailyProgress.challengeId, challengeData.id),
        or(
          lt(dailyProgress.date, startDateObj),
          gt(dailyProgress.date, endDateObj),
        ),
      ),
    );
}

export async function deleteCurrentUserAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }

    await auth.api.deleteUser({
      headers: await headers(),
      body: {
        password: session.session.token,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
