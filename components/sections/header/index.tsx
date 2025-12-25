"use client";

// if you know a better way to do this please let me know
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

export function Header() {
  const positionY = useScrollPosition();
  const controls = useAnimation();
  const pathname = usePathname() || "/";

  useEffect(() => {
    controls.start({
      y: (pathname == "/" ? positionY > 250 : true) ? 0 : "-200%",
      transition: { duration: 0.3 }
    });
  }, [positionY, controls, pathname]);

  return (
    <motion.header
      initial={{ y: "-200%" }}
      animate={controls}
      className="fixed top-4 left-2 right-2 z-40 bg-gray-50 border border-gray-200 text-gray-600 bg-opacity-80 p-4 rounded-full flex items-center justify-between max-w-xl mx-auto"
      aria-hidden={pathname == "/"}
    >
      <Link href="/" className="font-bold sm:text-xl font-heading">
        Juan Almanza
      </Link>
      <nav className="flex items-center gap-2">
        <Clock />
        <a
          href="https://github.com/scott-almanza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon
            icon={GithubIcon}
            className="h-5 w-5"
            color="black"
            strokeWidth={2}
          />
        </a>

        <a
          href="https://linkedin.com/in/scidroid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon
            icon={LinkedinIcon}
            className="h-5 w-5"
            color="black"
            strokeWidth={2}
          />
        </a>
        <a
          href="https://x.com/scidroid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon
            icon={NewTwitterIcon}
            className="h-5 w-5"
            color="black"
            strokeWidth={2}
          />
        </a>
        <a
          href="https://instagram.com/scidroid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon
            icon={InstagramIcon}
            className="h-5 w-5"
            color="black"
            strokeWidth={2}
          />
        </a>
      </nav>
    </motion.header>
  );
}
