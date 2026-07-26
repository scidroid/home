import Image from "next/image";

import minerva from "@/components/sections/about/images/minerva.webp";
import { TextLink } from "@/components/ui/text-link";

export function Bio() {
  return (
    <section>
      <p className="text-gray-600 leading-relaxed">
        Hi! I'm a sophomore at{" "}
        <TextLink href="https://minerva.edu">
          <Image
            src={minerva}
            alt=""
            className="inline-block h-5 w-5 rounded object-cover align-text-bottom mr-0.5"
          />
          Minerva University
        </TextLink>
        , studying biology and math. I split my time working on startups and
        doing research to ensure humanity's advances reach everyone. I'm always
        open to collaborating on{" "}
        <span className="font-bold">unconventional ideas</span>.{" "}
        <TextLink href="/#contact">Let&apos;s connect</TextLink>.
      </p>
    </section>
  );
}
