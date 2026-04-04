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
    <section className="px-4 lg:px-8 mx-auto my-2 sm:my-4 flex flex-col-reverse items-center text-center xl:flex-row xl:justify-between xl:gap-8 overflow-visible">
      <div className="w-full max-w-md xl:max-w-lg">
        <div className="my-2 sm:my-4 xl:text-left flex flex-col items-center xl:block">
          <h1 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold bg-linear-to-t from-gray-600 to-gray-800 bg-clip-text text-transparent font-heading xl:leading-tight leading-tight">
            {copy.name}
          </h1>

          <Subtitle />
        </div>

        <p className="my-2 sm:my-4 text-base sm:text-lg text-center xl:text-left">
          I&apos;m a <Age /> years old{" "}
          {copy.about.charAt(0).toLowerCase() + copy.about.slice(1)}
        </p>

        <div className="my-2 sm:my-4 flex flex-col sm:flex-row items-center justify-between w-full gap-2">
          <NowPlaying />
          <Health />
        </div>

        <div className="my-2 sm:my-4 flex items-center justify-between w-full gap-2">
          <a
            href="https://almanza.cv/juan_almanza_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read my resume (opens in new tab)"
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl px-3 py-2 sm:px-4 sm:py-3 w-full text-center transition-colors font-medium shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <HugeiconsIcon
              icon={LicenseIcon}
              className="h-4 w-4 sm:h-5 sm:w-5"
              color="gray"
              strokeWidth={1.5}
            />
            Resume →
          </a>
          <Link
            href="/#contact"
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl px-3 py-2 sm:px-4 sm:py-3 w-full text-center transition-colors font-medium shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <HugeiconsIcon
              icon={CallIcon}
              className="h-4 w-4 sm:h-5 sm:w-5"
              color="gray"
              strokeWidth={1.5}
            />
            Contact →
          </Link>
        </div>
      </div>

      <div className="px-2 sm:px-4">
        <Gallery />
      </div>
    </section>
  );
}
