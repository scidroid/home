"use client";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import { Clock } from "@/components/sections/header/clock";
import { Link } from "@/components/ui/link";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo
} from "@/components/ui/social-icons";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from "motion/react";

const socialLinks = [
  {
    href: "https://github.com/scidroid",
    Icon: GithubLogo,
    label: "GitHub",
    accent: "hover:text-[#181717] focus-visible:text-[#181717]"
  },
  {
    href: "https://linkedin.com/in/scidroid",
    Icon: LinkedinLogo,
    label: "LinkedIn",
    accent: "hover:text-[#0A66C2] focus-visible:text-[#0A66C2]"
  },
  {
    href: "https://x.com/scidroid",
    Icon: XLogo,
    label: "X (Twitter)",
    accent: "hover:text-black focus-visible:text-black"
  },
  {
    href: "https://instagram.com/scidroid",
    Icon: InstagramLogo,
    label: "Instagram",
    accent: "hover:text-[#E4405F] focus-visible:text-[#E4405F]"
  }
];

export function Header() {
  const pathname = usePathname() || "/";
  const prefersReducedMotion = useReducedMotion();

  // Threshold detection without per-scroll re-renders: the motion value
  // updates every frame, but React state only flips at the boundary.
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", y => setScrolled(y > 250));
  useEffect(() => {
    setScrolled(window.scrollY > 250);
  }, []);

  const isVisible = pathname === "/" ? scrolled : true;

  return (
    <motion.header
      initial={{ y: "-120%" }}
      animate={{ y: isVisible ? "0%" : "-120%" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : isVisible
            ? { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
            : { duration: 0.2, ease: "easeIn" }
      }
      className="fixed top-2 sm:top-4 left-2 right-2 z-40 bg-gray-50/85 border border-gray-200 text-gray-600 px-3 py-2 sm:p-4 rounded-full flex items-center justify-between max-w-xl mx-auto backdrop-blur-md shadow-lg shadow-gray-900/5"
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <Link
        href="/"
        className="font-bold sm:text-xl font-heading text-gray-800 transition-colors hover:text-gray-950 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
      >
        Juan Almanza
      </Link>

      <nav
        aria-label="Social links"
        className="flex items-center gap-1 sm:gap-2"
      >
        <Clock />
        {socialLinks.map(({ href, Icon, label, accent }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in new tab)`}
            className={`p-1.5 sm:p-1 rounded-full text-gray-600 hover:bg-gray-200/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${accent}`}
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.15, y: -1 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
}
