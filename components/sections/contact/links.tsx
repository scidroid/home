"use client";

import { useState } from "react";

import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function MailLink() {
  const [copied, setCopied] = useState(false);

  const email = "juan@almanza.cc";

  const handleClick = () => {
    navigator.clipboard.writeText(email);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <HugeiconsIcon icon={Mail01Icon} />
      <p className="font-heading text-xl">
        {copied ? "Copied!" : "juan [at] almanza [dot] cc"}
      </p>
    </div>
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
      className="flex items-center gap-2 cursor-pointer"
    >
      {icon}
      <p className="font-heading text-xl">{text}</p>
    </a>
  );
}
