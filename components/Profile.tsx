import Image from "next/image";
import Link from "next/link";

import { copy } from "@/content/copy";
import headshot from "@/public/juan.jpg";

import { Age } from "./age";
import { HealthData } from "./health";
import { NowPlaying } from "./now-playing";
import { Subtitle } from "./subtitle";

export function Profile() {
  return (
    <section className="w-[95%] mx-auto my-4 flex flex-col-reverse items-center text-center xl:flex-row xl:justify-between xl:gap-8">
      <div className="max-w-md xl:max-w-lg">
        <div className="my-4 xl:text-left flex flex-col items-center xl:block">
          <h1 className="text-4xl xl:text-6xl font-extrabold bg-gradient-to-t from-gray-600 to-gray-800 bg-clip-text text-transparent font-heading xl:leading-tight leading-tight">
            {copy.name}
          </h1>
          <Subtitle />
        </div>

        <p className="my-4 text-lg text-justify">
          I&apos;m a <Age /> years old {copy.about}
        </p>

        <div className="my-4 flex flex-col xl:flex-row items-center justify-between w-full gap-2">
          <NowPlaying />
          <HealthData />
        </div>

        <div className="my-4 flex items-center justify-between w-full gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            className="h-12 rounded-xl border-2 border-gray-300 w-full flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-bl from-gray-100 via-gray-100 to-gray-100 text-center duration-300 transition-all hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-200 hover:to-gray-100 hover:text-gray-800"
          >
            Read my resume
          </a>
          <Link
            href="/#contact"
            className="h-12 rounded-xl border-2 border-gray-300 w-full flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-bl from-gray-100 via-gray-100 to-gray-100 text-center duration-300 transition-all hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-200 hover:to-gray-100 hover:text-gray-800"
          >
            Contact me
          </Link>
        </div>
      </div>

      <figure className="w-40 h-40 xl:w-[550px] xl:h-[550px] rounded-lg object-cover">
        <Image
          src={headshot}
          alt="Headshot of Juan Almanza, an undergraduate student from Colombia"
          className="w-full h-full rounded-lg object-cover"
          width={640}
          priority
          placeholder="blur"
          draggable={false}
        />
        <figcaption className="text-left mt-1 text-gray-500 font-heading text-lg hidden xl:block">
          Burgas, Bulgaria. August 14th, 2024.
        </figcaption>
      </figure>
    </section>
  );
}
