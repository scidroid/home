"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Reading } from "@/.contentlayer/generated";
import { useScrollPosition } from "@/hooks/scroll";

import { Clock } from "./Clock";
import { Container } from "./Containing";
import { GithubLogo } from "./icons/GithubLogo";
import { LinkedinLogo } from "./icons/LinkedinLogo";
import { XLogo } from "./icons/XLogo";

export default function Header({ reading }: { reading: Reading }) {
  let pathname = usePathname() || "/";
  const scrollY = useScrollPosition();

  return (
    <header className="sticky top-0 z-50 border-b-2 bg-white p-2 px-4 text-xl">
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
            <span className="ml-2 hidden lg:block">
              - <Clock /> in Colombia
            </span>
          </span>
        </p>
        <nav className="flex items-center gap-1">
          <span className="hidden font-bold lg:block">Read:</span>
          <Link
            href={`/${reading.slug}`}
            className="mr-2 hidden underline hover:no-underline lg:block"
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
