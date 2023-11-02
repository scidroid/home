import Image from "next/image";

import headshot from "@/public/headshot.png";
import { NowPlaying } from "./NowPlaying";
import { HealthData } from "./Health";
import { Subtitle } from "./Subtitle";
import { Age } from "./Age";
import { StyledLink } from "@/components/StyledLink";

export function Profile() {
  return (
    <section className="flex flex-col-reverse items-center text-center m-4 lg:m-0 lg:flex-row lg:text-left lg:max-h-[1000px]">
      <div className="lg:w-1/2 lg:m-8">
        <div className="my-4 lg:my-8">
          <h1 className="text-4xl font-extrabold lg:text-7xl">Juan Almanza</h1>
          <Subtitle />
        </div>

        <p className="my-4 text-lg lg:text-xl lg:my-8">
          Juan is a <Age /> years old passionate High School student from
          Colombia with solid leadership and engineering skills. Focused on
          creating solutions for rural populations and advocating for STEM
          education and gender equality.
        </p>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:items-start lg:my-8">
          <NowPlaying />
          <HealthData />
        </div>

        <div className="my-4 flex flex-col items-center gap-y-2 lg:items-start lg:my-8">
          <StyledLink external href="/resume.pdf">
            Read my resume {"->"}
          </StyledLink>
          <StyledLink href="/#contact">Contact me {"->"}</StyledLink>
        </div>
      </div>

      <Image
        src={headshot}
        alt="Selfie of Juan Almanza, a High School student from Colombia"
        className="w-40 rounded-full object-cover lg:rounded-none lg:w-1/2"
        width={800}
        priority
      />
    </section>
  );
}
