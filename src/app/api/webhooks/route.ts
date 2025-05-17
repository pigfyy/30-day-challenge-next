import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db, user } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { deleteUser } from "@/lib/db/user";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType == "user.created") {
    const { id, email_addresses, username, created_at, updated_at, image_url } =
      evt.data;

    if (process.env.DISCORD_WEBHOOK_URL) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        message: `New user created! Email address: ${email_addresses[0].email_address}`,
      });

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(process.env.DISCORD_WEBHOOK_URL, requestOptions).catch(
        (error) => console.error(error),
      );
    }

    try {
      if (
        id &&
        email_addresses &&
        username &&
        created_at &&
        updated_at &&
        image_url
      ) {
        await db.insert(user).values({
          email: email_addresses[0].email_address,
          username: username!,
          imageUrl: image_url,
          clerkId: id,
          createdAt: new Date(created_at),
        });
      }

      return new Response("New user created!", { status: 200 });
    } catch (e: unknown) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  } else if (eventType == "user.deleted") {
    const { id } = evt.data;

    try {
      if (!id) {
        throw new Error("No id provided");
      }

      await deleteUser(id);

      return new Response("User deleted!", { status: 200 });
    } catch (e: unknown) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  } else if (eventType == "user.updated") {
    const { id, email_addresses, username, updated_at, image_url } = evt.data;

    try {
      await db
        .update(user)
        .set({
          email: email_addresses[0].email_address,
          username: username!,
          imageUrl: image_url,
        })
        .where(eq(user.clerkId, id));
      return new Response("User updated!", { status: 200 });
    } catch (e: unknown) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
