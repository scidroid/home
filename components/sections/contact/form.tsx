"use client";

import { useActionState } from "react";

import { sendContactForm } from "@/actions/contact";

export function Form() {
  const [state, action, isPending] = useActionState(sendContactForm, {
    message: "",
    previous: new FormData(),
    done: false
  });

  const isDisabled = isPending || state.done;

  return (
    <form action={action} className="w-full max-w-xl mx-auto xl:mx-0">
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-600"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={1}
          placeholder="John Appleseed"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-white text-gray-700 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={state.previous.get("name") as string}
          disabled={isDisabled}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@apple.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-white text-gray-700 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={state.previous.get("email") as string}
          disabled={isDisabled}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-gray-600"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={1}
          placeholder="Hello, I'd like to contact you!"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 bg-white text-gray-700 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          defaultValue={state.previous.get("message") as string}
          disabled={isDisabled}
        />
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <button
          disabled={isDisabled}
          type="submit"
          className={`rounded-lg border w-full px-4 py-2.5 font-medium transition-all ${
            isDisabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          {isPending ? "Sending..." : state.done ? "Message received!" : "Send"}
        </button>
      </div>

      {state.message && (
        <div className="mb-4">
          <p className="text-base font-medium text-red-600">{state.message}</p>
        </div>
      )}
    </form>
  );
}
