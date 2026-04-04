import Image from "next/image";

import minerva from "@/components/sections/about/images/minerva.webp";

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
        . I believe that everyone despite their opportunities in life deserve to
        benefit from the advances of the humanity. I have been working for years
        exploring how to create scalable and accessible solutions that make an
        impact in multiple fields. I'm always open to collaborating on{" "}
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
