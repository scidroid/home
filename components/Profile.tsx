import Image from "next/image";

import { StyledLink } from "@/components/StyledLink";
import headshot from "@/public/headshot.avif";

import { Age } from "./Age";
import { HealthData } from "./Health";
import { NowPlaying } from "./NowPlaying";
import { Subtitle } from "./Subtitle";

export function Profile() {
  return (
    <section className="m-4 flex flex-col-reverse items-center text-center xl:flex-row xl:justify-between">
      <div className="max-w-md xl:max-w-lg">
        <div className="my-4 xl:text-left">
          <h1 className="text-4xl xl:text-6xl font-extrabold bg-gradient-to-t from-gray-500 to-gray-100 bg-clip-text text-transparent">
            Juan Almanza
          </h1>
          <Subtitle />
        </div>

        <p className="my-4 text-lg text-justify">
          I&apos;m a <Age /> years old passionate High School student from
          Colombia with solid leadership and engineering skills. Focused on
          creating solutions for rural populations and advocating for STEM
          education and gender equality.
        </p>

        <div className="my-4 flex flex-col gap-y-2">
          <NowPlaying />
          <HealthData />
        </div>

        <div className="my-4 flex flex-col items-start gap-y-2">
          <StyledLink external href="/resume.pdf">
            Read my resume {"->"}
          </StyledLink>
          <StyledLink href="/#contact">Contact me {"->"}</StyledLink>
        </div>
      </div>

      <Image
        src={headshot}
        alt="Selfie of Juan Almanza, a High School student from Colombia"
        className="w-40 xl:w-[550px] rounded-lg object-cover"
        width={640}
        priority
      />
    </section>
  );
}
