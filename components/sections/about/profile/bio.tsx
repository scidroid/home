import Image from "next/image";
import Link from "next/link";
import minerva from "@/components/sections/about/images/minerva.jpeg";

export function Bio() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-1">Who I Am</h3>
      <p>
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
        , passionate about applying computational science to create
        real-world impact. I work at the intersection of technology,
        research, and social good. I like to do weird things, so feel free
        to{" "}
        <Link
          className="text-black underline hover:no-underline"
          href="/#contact"
        >
          contact me
        </Link>{" "}
        with all your ideas.
      </p>
    </section>
  );
} 