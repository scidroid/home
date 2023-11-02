"use client";

import { Reading } from "@/.contentlayer/generated";
import { Clock } from "./Clock";
import { useScrollPosition } from "@/hooks/scroll";
import { Container } from "./Containing";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ reading }: { reading: Reading }) {
  let pathname = usePathname() || "/";
  const scrollY = useScrollPosition();

  return (
    <header className="bg-white p-2 sticky top-0 z-50 text-xl px-4 border-b-2">
      <Container className="flex items-center justify-between">
        <p aria-label="Juan Almanza">
          <span className={pathname == "/" && scrollY < 150 ? "hidden" : ""}>
            <Link href={"/"} className="font-bold">
              Juan Almanza
            </Link>{" "}
            - <Clock />
          </span>
        </p>
        <nav>
          <span className="font-bold">Read:</span>{" "}
          <Link
            href={`/${reading.slug}`}
            className="underline hover:no-underline"
          >
            {reading.title}
          </Link>
        </nav>
      </Container>
    </header>
  );
}
