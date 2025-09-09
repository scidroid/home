import { NextRequest, NextResponse } from "next/server";
import { generateReplyEmail } from "@/emails/reply";

interface ReplyRequest {
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const { RESEND_API_KEY } = process.env;
    
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "Resend API key not configured" }, { status: 500 });
    }

    const { email, name }: ReplyRequest = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Juan Almanza <contact@automated.scidroid.co>",
        reply_to: "hi@scidroid.co",
        to: email,
        subject: "Re: Your message to Juan Almanza",
        html: generateReplyEmail(name)
      })
    });

    if (!emailResponse.ok) {
      throw new Error(`Email sending failed: ${emailResponse.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reply email error:", error);
    return NextResponse.json({ error: "Failed to send reply email" }, { status: 500 });
  }
}