"use client";

import { Reading } from "@/.contentlayer/generated";
import { Clock } from "./Clock";
import { useScrollPosition } from "@/hooks/scroll";
import { Container } from "./Containing";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubLogo } from "./icons/GithubLogo";
import { LinkedinLogo } from "./icons/LinkedinLogo";
import { XLogo } from "./icons/XLogo";

export default function Header({ reading }: { reading: Reading }) {
  let pathname = usePathname() || "/";
  const scrollY = useScrollPosition();

  return (
    <header className="bg-white p-2 sticky top-0 z-50 text-xl px-4 border-b-2">
      <Container className="flex items-center justify-between">
        <p aria-hidden>
          <span
            className={
              pathname == "/" && scrollY < 150 ? "hidden" : " flex items-center"
            }
          >
            <Link href={"/"} className="font-bold">
              Juan Almanza
            </Link>{" "}
            <span className="hidden lg:block ml-2">
              - <Clock /> in Colombia
            </span>
          </span>
        </p>
        <nav className="flex items-center gap-1">
          <span className="font-bold hidden lg:block">Read:</span>
          <Link
            href={`/${reading.slug}`}
            className="underline hover:no-underline hidden lg:block mr-2"
          >
            {reading.title}
          </Link>
          <div className="flex gap-3">
            <GithubLogo />
            <LinkedinLogo />
            <XLogo />
          </div>
        </nav>
      </Container>
    </header>
  );
}
