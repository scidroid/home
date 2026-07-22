import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET, PASSWORD } =
      process.env;

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        { error: "Bot token not configured" },
        { status: 500 }
      );
    }

    const { password } = await request.json();

    if (password !== PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhookUrl = `${request.nextUrl.origin}/api/telegram/webhook`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webhookUrl,
          secret_token: TELEGRAM_WEBHOOK_SECRET,
          allowed_updates: ["callback_query", "message"]
        })
      }
    );

    const result = await response.json();

    if (!result.ok) {
      return NextResponse.json({ error: result.description }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Webhook registered successfully",
      webhook_url: webhookUrl
    });
  } catch (error) {
    console.error("Webhook setup error:", error);
    return NextResponse.json(
      { error: "Failed to set up webhook" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { TELEGRAM_BOT_TOKEN } = process.env;

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        { error: "Bot token not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Webhook info error:", error);
    return NextResponse.json(
      { error: "Failed to get webhook info" },
      { status: 500 }
    );
  }
}
