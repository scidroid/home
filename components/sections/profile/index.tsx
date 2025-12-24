import Link from "next/link";

import { Age } from "@/components/sections/profile/age";
import { Gallery } from "@/components/sections/profile/gallery";
import { Health } from "@/components/sections/profile/health";
import { NowPlaying } from "@/components/sections/profile/now-playing";
import { Subtitle } from "@/components/sections/profile/subtitle";
import { copy } from "@/content/copy";
import { CallIcon, LicenseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Profile() {
  return (
    <section className=" mx-auto my-4 flex flex-col-reverse items-center text-center xl:flex-row xl:justify-between xl:gap-8 overflow-visible">
      <div className="max-w-md xl:max-w-lg">
        <div className="my-4 xl:text-left flex flex-col items-center xl:block">
          <h1 className="text-4xl xl:text-6xl font-extrabold bg-gradient-to-t from-gray-600 to-gray-800 bg-clip-text text-transparent font-heading xl:leading-tight leading-tight">
            {copy.name}
          </h1>

          <Subtitle />
        </div>

        <p className="my-4 text-lg text-justify">
          I&apos;m a <Age /> years old{" "}
          {copy.about.charAt(0).toLowerCase() + copy.about.slice(1)}
        </p>

        <div className="my-4 flex flex-col xl:flex-row items-center justify-between w-full gap-2">
          <NowPlaying />
          <Health />
        </div>

        <div className="my-4 flex items-center justify-between w-full gap-2">
          <a
            href="https://almanza.cc/resume.pdf"
            target="_blank"
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl px-4 py-3 w-full text-center transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <HugeiconsIcon
              icon={LicenseIcon}
              className="h-5 w-5"
              color="gray"
              strokeWidth={1.5}
            />
            Read my resume →
          </a>
          <Link
            href="/#contact"
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl px-4 py-3 w-full text-center transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <HugeiconsIcon
              icon={CallIcon}
              className="h-5 w-5"
              color="gray"
              strokeWidth={1.5}
            />
            Contact me →
          </Link>
        </div>
      </div>

      <div className="px-4">
        <Gallery />
      </div>
    </section>
  );
}
