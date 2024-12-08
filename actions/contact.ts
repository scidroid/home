"use server";

import { generateContactEmail } from "@/emails/contact";
import { resend } from "@/lib/resend";

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export async function sendContactForm(_state: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (name.length < 1) {
    return { message: "Name is required", previous: formData, done: false };
  }

  if (!isValidEmail(email)) {
    return {
      message: "Please provide a valid email address",
      previous: formData,
      done: false
    };
  }

  if (message.length < 1) {
    return {
      message: "Message is required",
      previous: formData,
      done: false
    };
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const telegramMessage = `New message from ${name} (${email}):\n\n${message}`;

  try {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage
          })
        }
      );

      if (!response.ok) {
        console.error(
          "Telegram notification failed, falling back to email only"
        );
      }
    } catch (telegramError) {
      console.error("Telegram error:", telegramError);
    }

    await resend.emails.send({
      from: "Juan Almanza <contact@automated.scidroid.co>",
      replyTo: "hi@scidroid.co",
      to: email,
      bcc: "hi@scidroid.co",
      subject: "Message sent to Juan Almanza",
      html: generateContactEmail(name, message, email)
    });

    return { message: "", previous: formData, done: true };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      message: "Something went wrong. Please try again later.",
      previous: formData,
      done: false
    };
  }
}
