"use client";

import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { Clock } from "@/components/sections/header/clock";
import { Link } from "@/components/ui/link";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo
} from "@/components/ui/social-icons";
import { useScrollPosition } from "@/hooks/scroll";
import { motion, useAnimation } from "motion/react";

const socialLinks = [
  { href: "https://github.com/scidroid", Icon: GithubLogo, label: "GitHub" },
  {
    href: "https://linkedin.com/in/scidroid",
    Icon: LinkedinLogo,
    label: "LinkedIn"
  },
  {
    href: "https://x.com/scidroid",
    Icon: XLogo,
    label: "X (Twitter)"
  },
  {
    href: "https://instagram.com/scidroid",
    Icon: InstagramLogo,
    label: "Instagram"
  }
];

export function Header() {
  const positionY = useScrollPosition();
  const controls = useAnimation();
  const pathname = usePathname() || "/";

  const isVisible = pathname === "/" ? positionY > 250 : true;

  useEffect(() => {
    controls.start({
      y: isVisible ? 0 : "-200%",
      transition: { duration: 0.3 }
    });
  }, [isVisible, controls]);

  return (
    <motion.header
      initial={{ y: "-200%" }}
      animate={controls}
      className="fixed top-2 sm:top-4 left-2 right-2 z-40 bg-gray-50 border border-gray-200 text-gray-600 bg-opacity-80 px-3 py-2 sm:p-4 rounded-full flex items-center justify-between max-w-xl mx-auto backdrop-blur-sm"
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <Link href="/" className="font-bold sm:text-xl font-heading">
        Juan Almanza
      </Link>

      <nav
        aria-label="Social links"
        className="flex items-center gap-1 sm:gap-2"
      >
        <Clock />
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in new tab)`}
            className="p-1.5 sm:p-1 rounded-full text-black hover:bg-gray-200/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
