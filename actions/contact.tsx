"use server";

import { resend } from "@/lib/resend";
import { Contact } from "@/emails/Contact";

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
    from: "Juan Almanza <hi@scidroid.co>",
    to: [email, "scidroidgames@gmail.com"],
    subject: "You sent a message to Juan Almanza",
    react: <Contact name={name} email={email} message={message} />,
  });
}
