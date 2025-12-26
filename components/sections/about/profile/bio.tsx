import Image from "next/image";

import minerva from "@/components/sections/about/images/minerva.jpeg";

export function Bio() {
  return (
    <section>
      <p className="text-gray-600 leading-relaxed">
        Hi! I'm a freshman at{" "}
        <a
          href="https://minerva.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 font-medium underline hover:no-underline"
        >
          <Image
            src={minerva}
            alt=""
            className="inline-block h-5 w-5 rounded object-cover align-text-bottom mr-0.5"
          />
          Minerva University
        </a>
        . Passionate about leveraging computational science to solve real-world
        problems at the intersection of technology and social impact. I have
        been working for years exploring how to create scalable solutions that
        make an impact in multiple fields. Always open to collaborating on{" "}
        <span className="font-bold">unconventional ideas</span>.{" "}
        <a
          href="/#contact"
          className="text-gray-900 font-medium underline hover:no-underline"
        >
          Let&apos;s connect
        </a>
        .
      </p>
    </section>
  );
}
