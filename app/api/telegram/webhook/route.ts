import { NextRequest, NextResponse } from "next/server";

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
}

export async function POST(request: NextRequest) {
  try {
    const { TELEGRAM_BOT_TOKEN } = process.env;
    
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
    }

    const update: TelegramUpdate = await request.json();

    if (update.callback_query?.data?.startsWith("reply_")) {
      const [, email, name] = update.callback_query.data.split("_");
      
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: update.callback_query.id,
            text: "Reply email sent!"
          })
        }
      );

      const response = await fetch(`${request.nextUrl.origin}/api/telegram/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decodeURIComponent(email),
          name: decodeURIComponent(name)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send reply email");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}