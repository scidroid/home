import { NextRequest, NextResponse } from "next/server";

import { generateReplyEmail } from "@/emails/reply";

import { redis } from "@/lib/redis";

interface TelegramUpdate {
  update_id: number;
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
    message?: {
      message_id: number;
      chat: {
        id: number;
      };
    };
    data?: string;
  };
  message?: {
    message_id: number;
    from: {
      id: number;
    };
    chat: {
      id: number;
    };
    text?: string;
    reply_to_message?: {
      message_id: number;
    };
  };
}

interface PendingReply {
  email: string;
  name: string;
  promptMessageId: number;
}

export async function POST(request: NextRequest) {
  try {
    const {
      TELEGRAM_BOT_TOKEN,
      TELEGRAM_WEBHOOK_SECRET,
      TELEGRAM_CHAT_ID,
      RESEND_API_KEY
    } = process.env;

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        { error: "Bot token not configured" },
        { status: 500 }
      );
    }

    const secretToken = request.headers.get("x-telegram-bot-api-secret-token");
    if (TELEGRAM_WEBHOOK_SECRET && secretToken !== TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update: TelegramUpdate = await request.json();

    // Handle callback query (button click)
    if (update.callback_query?.data?.startsWith("reply_")) {
      const [, email, name] = update.callback_query.data.split("_");
      const decodedEmail = decodeURIComponent(email);
      const decodedName = decodeURIComponent(name);

      // Send prompt message
      const promptResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `📝 Reply to ${decodedName} (${decodedEmail}):\n\nType your message and send it as a reply to this message.`,
            reply_markup: {
              force_reply: true,
              selective: true
            }
          })
        }
      );

      const promptResult = await promptResponse.json();

      if (promptResult.ok) {
        // Store pending reply in KV
        await redis.set(
          `telegram_reply:${promptResult.result.message_id}`,
          {
            email: decodedEmail,
            name: decodedName,
            promptMessageId: promptResult.result.message_id
          },
          { ex: 3600 }
        ); // Expires in 1 hour
      }

      // Answer callback query
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: update.callback_query.id,
            text: "Reply to the message above with your response"
          })
        }
      );
    }

    // Handle reply message
    if (update.message?.reply_to_message && update.message.text) {
      const replyToId = update.message.reply_to_message.message_id;
      const pendingReply = await redis.get<PendingReply>(
        `telegram_reply:${replyToId}`
      );

      if (pendingReply) {
        // Send the reply email
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: "Juan Almanza <contact@automated.scidroid.co>",
            reply_to: "juan@almanza.cc",
            to: pendingReply.email,
            subject: "Re: Your message to Juan Almanza",
            html: generateReplyEmail(pendingReply.name, update.message.text)
          })
        });

        // Delete the pending reply
        await redis.del(`telegram_reply:${replyToId}`);

        // Send confirmation
        const statusText = emailResponse.ok
          ? `✅ Reply sent to ${pendingReply.name} (${pendingReply.email})`
          : `❌ Failed to send reply to ${pendingReply.email}`;

        await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: statusText,
              reply_to_message_id: update.message.message_id
            })
          }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
