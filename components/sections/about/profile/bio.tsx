import Image from "next/image";
import Link from "next/link";

import minerva from "@/components/sections/about/images/minerva.jpeg";

export function Bio() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">About</h3>
      <p className="text-gray-700 leading-relaxed">
        Freshman at{" "}
        <a
          href="https://minerva.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline hover:no-underline"
        >
          <Image
            src={minerva}
            alt="Minerva University"
            className="inline-block h-8 w-8 mr-1 rounded-lg object-cover"
          />
          Minerva University
        </a>
        . Passionate about leveraging computational science to solve real-world
        problems at the intersection of technology and social impact. Always
        open to collaborating on unconventional ideas, contact me.
      </p>
    </section>
  );
}
