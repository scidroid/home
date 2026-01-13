"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Clock } from "@/components/sections/header/clock";
import { Link } from "@/components/ui/link";
import { useScrollPosition } from "@/hooks/scroll";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  NewTwitterIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useAnimation } from "motion/react";

const socialLinks = [
  { href: "https://github.com/scidroid", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/scidroid", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://x.com/scidroid", icon: NewTwitterIcon, label: "X (Twitter)" },
  { href: "https://instagram.com/scidroid", icon: InstagramIcon, label: "Instagram" },
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
      className="fixed top-4 left-2 right-2 z-40 bg-gray-50 border border-gray-200 text-gray-600 bg-opacity-80 p-4 rounded-full flex items-center justify-between max-w-xl mx-auto backdrop-blur-sm"
      aria-hidden={!isVisible}
    >
      <Link href="/" className="font-bold sm:text-xl font-heading">
        Juan Almanza
      </Link>

      <nav aria-label="Social links" className="flex items-center gap-2">
        <Clock />
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in new tab)`}
            className="p-1 rounded-full hover:bg-gray-200/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <HugeiconsIcon
              icon={icon}
              className="h-5 w-5"
              color="black"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
