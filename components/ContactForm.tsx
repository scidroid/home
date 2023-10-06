"use client";

import { sendContactForm } from "@/actions/contact";
import { useState } from "react";
import { StyledLink } from "./StyledLink";

export function ContactForm() {
  const [status, setStatus] = useState<"Send" | "Loading..." | "Sent">("Send");

  async function handleSubmit(formData: FormData) {
    setStatus("Loading...");

    await sendContactForm(formData);

    setStatus("Sent");
  }

  return (
    <section
      id="contact"
      className="lg:w-full lg:min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between"
    >
      <div className="w-full lg:w-1/2 lg:ml-8 mt-4 text-neutral-700">
        <h2 className="text-center lg:text-left text-5xl lg:text-7xl font-extrabold mb-2 lg:max-w-xl">
          Get in touch
        </h2>
        <p className="text-center lg:text-left text-xl my-8 mr-2">
          Have a project in mind? Looking to partner or work together? Reach out
          through the form and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="flex flex-col items-center justify-center w-full text-center lg:block lg:text-left">
          <div className="my-8 flex flex-col gap-2">
            <StyledLink href="mailto:hi@scidroid.co" external>
              Send me an email {"->"}
            </StyledLink>
            <StyledLink href="https://linkedin.com/in/scidroid" external>
              Connect in Linkedin {"->"}
            </StyledLink>
            <StyledLink href="https://x.com/scidroid" external>
              Follow me on X {"->"}
            </StyledLink>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <form action={handleSubmit} className="space-y-4 mx-4 lg:mx-0">
          <div className="flex flex-col max-w-xl gap-1 my-2">
            <label
              htmlFor="name"
              className="text-xl font-bold text-neutral-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength={2}
              placeholder="Enter your name"
              className="max-w-3xl rounded-md py-2 px-2 text-neutral-700 border-2 border-gray-200 text-lg"
            />
          </div>
          <div className="flex flex-col max-w-xl gap-1 my-2">
            <label
              htmlFor="email"
              className="text-xl font-bold text-neutral-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="max-w-3xl rounded-md py-2 px-2 text-neutral-700 border-2 border-gray-200 text-lg"
            />
          </div>
          <div className="flex flex-col max-w-xl gap-1 my-2">
            <label
              htmlFor="message"
              className="text-xl font-bold text-neutral-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={5}
              placeholder="Enter your message"
              className="max-w-3xl rounded-md py-2 px-2 text-neutral-700 border-2 border-gray-200 text-lg"
            />
          </div>

          <div className="flex flex-col max-w-xl gap-1 my-2">
            <button
              disabled={status !== "Send"}
              type="submit"
              className="text-xl font-bold text-neutral-700 max-w-3xl rounded-md py-2 px-2 border-2 border-gray-200"
            >
              {status}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
