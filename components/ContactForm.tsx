"use client";

import { sendContactForm } from "@/actions/contact";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"Send" | "Loading..." | "Sent">("Send");

  async function handleSubmit(formData: FormData) {
    setStatus("Loading...");

    await sendContactForm(formData);

    setStatus("Sent");
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-8 m-4 max-w-xl mx-auto shadow-2xl rounded-xl">
      <div className="flex flex-col items-center text-center">
        <form action={handleSubmit} className="w-full">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={5}
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded p-2 h-32"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status != "Send"}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-100"
          >
            {status}
          </button>
        </form>
      </div>
    </div>
  );
}
