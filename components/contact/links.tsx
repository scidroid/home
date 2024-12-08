"use client";

import { useState } from "react";

import { Mail } from "lucide-react";

export function MailLink() {
  const [copied, setCopied] = useState(false);

  const email = "hi@scidroid.co";

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
      <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
      <p className="font-heading text-xl">
        {copied ? "Copied!" : "hi [at] scidroid [dot] co"}
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
      className="flex items-center gap-2 cursor-pointer"
    >
      {icon}
      <p className="font-heading text-xl">{text}</p>
    </a>
  );
}
