"use server";

import { generateContactEmail } from "@/emails/contact";

interface FormResponse {
  message: string;
  previous: FormData;
  done: boolean;
}

export async function sendContactForm(
  _state: any,
  formData: FormData
): Promise<FormResponse> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (name.length < 1) {
    return { message: "Name is required", previous: formData, done: false };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      message: "Please provide a valid email address",
      previous: formData,
      done: false
    };
  }

  if (message.length < 1) {
    return { message: "Message is required", previous: formData, done: false };
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RESEND_API_KEY } = process.env;

  try {
    let telegramSent = false,
      emailSent = false;

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `New message from ${name} (${email}):\n\n${message}`
          })
        }
      );

      telegramSent = telegramResponse.ok;
    } catch (error) {
      console.error("Telegram notification failed:", error);
    }

    try {
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
          bcc: "hi@scidroid.co",
          subject: "Message sent to Juan Almanza",
          html: generateContactEmail(name, message, email)
        })
      });

      emailSent = emailResponse.ok;
    } catch (error) {
      console.error("Email notification failed:", error);
    }

    if (!telegramSent && !emailSent) {
      throw new Error("Both notifications failed");
    }

    return { message: "", previous: formData, done: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      message: "Failed to send message. Please try again later.",
      previous: formData,
      done: false
    };
  }
}
