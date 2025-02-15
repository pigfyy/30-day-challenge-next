import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/(root)/prisma";
import { deleteUser } from "@/lib/db/user";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
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

    try {
      if (
        id &&
        email_addresses &&
        username &&
        created_at &&
        updated_at &&
        image_url
      ) {
        await prisma.user.create({
          data: {
            email: email_addresses[0].email_address,
            username: username!,
            imageUrl: image_url,
            clerkId: id,
            createdAt: new Date(created_at),
            updatedAt: new Date(updated_at),
          },
        });
      }

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

        fetch(process.env.DISCORD_WEBHOOK_URL, requestOptions).catch((error) =>
          console.error(error),
        );
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
      await prisma.user.update({
        where: {
          clerkId: id,
        },
        data: {
          email: email_addresses[0].email_address,
          username: username!,
          imageUrl: image_url,
          updatedAt: new Date(updated_at),
        },
      });
      return new Response("User updated!", { status: 200 });
    } catch (e: unknown) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
