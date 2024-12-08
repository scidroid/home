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
    <form action={action} className="">
      <div className="my-2 flex max-w-xl flex-col gap-1">
        <label
          htmlFor="name"
          className="text-xl font-bold text-gray-800 font-heading"
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
          className="w-full rounded-xl border-2 border-gray-300 p-3 bg-white text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200"
          defaultValue={state.previous.get("name") as string}
          disabled={isDisabled}
        />
      </div>
      <div className="my-2 flex max-w-xl flex-col gap-1">
        <label
          htmlFor="email"
          className="text-xl font-bold text-gray-800 font-heading"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@apple.com"
          className="w-full rounded-xl border-2 border-gray-300 p-3 bg-white text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200"
          defaultValue={state.previous.get("email") as string}
          disabled={isDisabled}
        />
      </div>
      <div className="my-2 flex max-w-xl flex-col gap-1">
        <label
          htmlFor="message"
          className="text-xl font-bold text-gray-800 font-heading"
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
          className="w-full rounded-xl border-2 border-gray-300 p-3 bg-white text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200"
          defaultValue={state.previous.get("message") as string}
          disabled={isDisabled}
        />
      </div>

      <div className="my-2 flex max-w-xl flex-col gap-1">
        <button
          disabled={isDisabled}
          type="submit"
          className={`h-12 rounded-xl border-2 border-gray-300 w-full flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-bl from-gray-100 via-gray-100 to-gray-100 text-center duration-300 transition-all ${
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-200 hover:to-gray-100 hover:text-gray-800"
          }`}
        >
          {isPending ? "Sending..." : state.done ? "Message received!" : "Send"}
        </button>
      </div>

      {state.message && (
        <div className="my-2 flex max-w-xl flex-col gap-1">
          <p className="font-bold text-gray-800">{state.message}</p>
        </div>
      )}
    </form>
  );
}
