import Image from "next/image";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import asofi from "@/components/sections/about/images/asofi.png";
import stanford from "@/components/sections/about/images/stanford.webp";

export function Work() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-1">Where I&apos;ve worked</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Founder of{" "}
          <a
            href="https://pulpoo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-800 underline hover:no-underline"
          >
            <Image
              src={pulpoo}
              alt="Pulpoo"
              className="inline-block h-6 w-6 mr-1 rounded-lg object-cover"
            />
            Pulpoo
          </a>
          , building scalable software platforms to help companies boost
          productivity (astronomically).
        </li>
        <li>
          Founder & technical leader at{" "}
          <a
            href="https://asofi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 underline hover:no-underline"
          >
            <Image
              src={asofi}
              alt="ASOFI"
              className="inline-block h-6 w-6 mr-1 rounded-lg object-cover"
            />
            ASOFI
          </a>
          , developing AI solutions for rural communities and leading
          educational initiatives.
        </li>
        <li>
          Research intern at{" "}
          <a
            href="https://stanford.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline hover:no-underline"
          >
            <Image
              src={stanford}
              alt="Stanford University"
              className="inline-block h-8 w-[21px] mr-1 object-cover"
            />
            Stanford University
          </a>
          , working on AI research for drug discovery and signal
          processing.
        </li>
      </ul>
    </section>
  );
} 