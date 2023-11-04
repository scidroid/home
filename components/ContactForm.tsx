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
      className="flex flex-col items-center text-center m-4 lg:m-0 lg:flex-row lg:text-left lg:max-h-[1000px]"
    >
      <div className="lg:w-1/2 lg:m-8">
        <h2 className="text-4xl font-semibold lg:text-6xl my-4 lg:my-8">
          Get in touch
        </h2>
        <p className="my-4 text-lg lg:text-xl lg:my-8">
          Have a project in mind? Looking to partner or work together? Reach out
          through the form and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:items-start lg:my-8">
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

      <div className="lg:w-1/2 lg:m-8">
        <form action={handleSubmit} className="">
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
              className="text-xl font-bold text-neutral-700 max-w-3xl rounded-md py-2 px-2 border-2 border-gray-200 bg-white hover:bg-neutral-200 transition-colors"
            >
              {status}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
