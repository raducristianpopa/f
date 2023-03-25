import { type IncomingHttpHeaders } from "http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/api";
import { buffer } from "micro";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { db } from "@bites/db";
import { nanoid } from "~/shared/nanoId";

enum WebhookEventType {
  UserCreated = "user.created",
}

type ReceivedData = {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  private_metadata: {
    userId: string;
  };
  primary_email_address_id: string;
  username: string;
  id: string;
};

export type Event = {
  data: ReceivedData;
  object: "event";
  type: WebhookEventType;
};

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const webhook = new Webhook(webhookSecret);
  let event: Event | null = null;

  try {
    event = webhook.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  const eventType: WebhookEventType = event.type;

  try {
    switch (eventType) {
      case WebhookEventType.UserCreated: {
        const { data } = event;
        const emailObject = data.email_addresses?.find(
          (email) => email.id === data.primary_email_address_id,
        );

        if (!emailObject) {
          return res.status(400).json({});
        }

        const id = nanoid();
        const user = await db
          .insertInto("users")
          .values({
            id,
            clerk_id: data.id,
            email: emailObject.email_address,
            username:
              emailObject.email_address.split("@")[0] ??
              emailObject.email_address,
          })
          .execute();

        if (!user) {
          throw new Error("Could not insert user.");
        }

        await clerkClient.users.updateUser(data.id, {
          privateMetadata: { user_id: id },
        });

        break;
      }
      default:
        console.log(`Received unknown event type: ${eventType}`);
        return res.status(200).json({});
    }
  } catch (e) {
    const errorInfo = e instanceof Error && e.stack ? e.stack : String(e);
    console.log(errorInfo);
    return res.status(400).json({});
  }

  res.status(201).json({});
}

export const config = {
  api: {
    bodyParser: false,
  },
};
