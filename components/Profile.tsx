import Image from "next/image";

import { StyledLink } from "@/components/StyledLink";
import headshot from "@/public/headshot.avif";

import { Age } from "./Age";
import { HealthData } from "./Health";
import { NowPlaying } from "./NowPlaying";
import { Subtitle } from "./Subtitle";

export function Profile() {
  return (
    <section className="m-4 flex flex-col-reverse items-center text-center lg:m-0 lg:max-h-[1000px] lg:flex-row lg:text-left">
      <div className="lg:m-8 lg:w-1/2">
        <div className="my-4 lg:my-8">
          <h1 className="text-4xl font-extrabold lg:text-7xl">Juan Almanza</h1>
          <Subtitle />
        </div>

        <p className="my-4 text-lg lg:my-8 lg:text-xl">
          Juan is a <Age /> years old passionate High School student from
          Colombia with solid leadership and engineering skills. Focused on
          creating solutions for rural populations and advocating for STEM
          education and gender equality.
        </p>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:my-8 lg:items-start">
          <NowPlaying />
          <HealthData />
        </div>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:my-8 lg:items-start">
          <StyledLink external href="/resume.pdf">
            Read my resume {"->"}
          </StyledLink>
          <StyledLink href="/#contact">Contact me {"->"}</StyledLink>
        </div>
      </div>

      <Image
        src={headshot}
        alt="Selfie of Juan Almanza, a High School student from Colombia"
        className="w-40 rounded-full object-cover lg:w-1/2 lg:rounded-none"
        width={640}
        quality={80}
        priority
      />
    </section>
  );
}
