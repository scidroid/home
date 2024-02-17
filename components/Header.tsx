"use client";

// if you know a better way to do this please let me know
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { useScrollPosition } from "@/hooks/scroll";
import { motion, useAnimation } from "framer-motion";

import { Clock } from "./Clock";
import { GithubLogo } from "./icons/GithubLogo";
import { LinkedinLogo } from "./icons/LinkedinLogo";
import { XLogo } from "./icons/XLogo";

export function Header() {
  const positionY = useScrollPosition();
  const controls = useAnimation();
  const pathname = usePathname() || "/";

  useEffect(() => {
    controls.start({
      y: (pathname == "/" ? positionY > 250 : true) ? 0 : "-200%",
      transition: { duration: 0.3 }
    });
  }, [positionY, controls]);

  return (
    <motion.header
      initial={{ y: "-200%" }}
      animate={controls}
      className="text-neutral-700 fixed top-4 left-2 right-2 z-40 bg-gradient-to-t from-gray-300 to-gray-50 bg-opacity-80 p-4 rounded-full flex items-center justify-between max-w-xl mx-auto"
      aria-hidden={pathname == "/"}
    >
      <Link href="/" className="font-bold text-xl">
        Juan Almanza
      </Link>
      <nav className="flex items-center gap-2">
        <Clock />
        <GithubLogo />
        <LinkedinLogo />
        <XLogo />
      </nav>
    </motion.header>
  );
}
