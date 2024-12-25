"use client";

// if you know a better way to do this please let me know
import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { Clock } from "@/components/sections/header/clock";
import { GithubLogo } from "@/components/ui/icons/github";
import { LinkedinLogo } from "@/components/ui/icons/linkedin";
import { XLogo } from "@/components/ui/icons/x";
import { Link } from "@/components/ui/link";
import { useScrollPosition } from "@/hooks/scroll";
import { motion, useAnimation } from "framer-motion";

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
      className="fixed top-4 left-2 right-2 z-40 bg-white bg-opacity-95 p-4 rounded-full flex items-center justify-between max-w-xl mx-auto"
      aria-hidden={pathname == "/"}
    >
      <Link href="/" className="font-bold sm:text-xl font-heading">
        Juan Almanza
      </Link>
      <nav className="flex items-center gap-2">
        <Clock />
        <GithubLogo link />
        <LinkedinLogo link />
        <XLogo link />
      </nav>
    </motion.header>
  );
}
