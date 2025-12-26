"use client";

import { useState } from "react";

import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function MailLink() {
  const [copied, setCopied] = useState(false);

  const email = "juan@almanza.cc";

  async function handleClick() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      className="flex items-center gap-2.5 group transition-colors"
      onClick={handleClick}
    >
      <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
        <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5" />
      </span>
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-base sm:text-lg underline decoration-gray-300 group-hover:decoration-gray-500 underline-offset-2">
        {copied ? "Copied!" : "juan@almanza.cc"}
      </span>
    </button>
  );
}

export function SocialLink({
  href,
  icon,
  text
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 group transition-colors"
    >
      <span className="text-gray-400 group-hover:text-gray-600 transition-colors [&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </span>
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-base sm:text-lg underline decoration-gray-300 group-hover:decoration-gray-500 underline-offset-2">
        {text}
      </span>
    </a>
  );
}
