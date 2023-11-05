"use server";

import { generateContactEmail } from "@/emails/contact";
import { resend } from "@/lib/resend";

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export async function sendContactForm(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!isValidEmail(email) || !name || !message) {
    return;
  }

  await resend.emails.send({
    from: "Juan Almanza <contact@automated.scidroid.co>",
    reply_to: "hi@scidroid.co",
    to: email,
    bcc: "hi@scidroid.co",
    subject: "Message sent to Juan Almanza",
    html: generateContactEmail(name, message, email)
  });
}
