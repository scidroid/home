"use client";

import { useState } from "react";

import { sendContactForm } from "@/actions/contact";

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
      className="m-4 flex flex-col items-center text-center lg:m-0 lg:max-h-[1000px] lg:flex-row lg:text-left"
    >
      <div className="lg:m-8 lg:w-1/2">
        <h2 className="my-4 text-4xl font-semibold lg:my-8 lg:text-6xl">
          Get in touch
        </h2>
        <p className="my-4 text-lg lg:my-8 lg:text-xl">
          Have a project in mind? Looking to partner or work together? Reach out
          through the form and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:my-8 lg:items-start">
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

      <div className="lg:m-8 lg:w-1/2">
        <form action={handleSubmit} className="">
          <div className="my-2 flex max-w-xl flex-col gap-1">
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
              className="max-w-3xl rounded-md border-2 border-gray-200 px-2 py-2 text-lg text-neutral-700"
            />
          </div>
          <div className="my-2 flex max-w-xl flex-col gap-1">
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
              className="max-w-3xl rounded-md border-2 border-gray-200 px-2 py-2 text-lg text-neutral-700"
            />
          </div>
          <div className="my-2 flex max-w-xl flex-col gap-1">
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
              className="max-w-3xl rounded-md border-2 border-gray-200 px-2 py-2 text-lg text-neutral-700"
            />
          </div>

          <div className="my-2 flex max-w-xl flex-col gap-1">
            <button
              disabled={status !== "Send"}
              type="submit"
              className="max-w-3xl cursor-default rounded-md border-2 border-gray-200 bg-white px-2 py-2 text-xl font-bold text-neutral-700 transition-colors hover:bg-neutral-200"
            >
              {status}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
