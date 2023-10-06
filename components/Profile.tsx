import Image from "next/image";

import headshot from "@/public/headshot.jpg";
import { NowPlaying } from "./NowPlaying";
import { HealthData } from "./Health";
import { Subtitle } from "./Subtitle";
import { Age } from "./Age";
import { StyledLink } from "@/components/StyledLink";

export function Profile() {
  return (
    <section className="lg:w-full lg:min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between">
      <div className="w-full lg:w-1/2 lg:ml-8 mt-4 text-neutral-700">
        <h1 className="text-center lg:text-left text-5xl lg:text-7xl font-extrabold mb-2 lg:max-w-xl">
          Juan Almanza
        </h1>
        <Subtitle />

        <p className="text-center lg:text-left text-xl my-8 mr-2">
          Juan is a <Age /> years old passionate High School student from
          Colombia with solid leadership and engineering skills. Focused on
          creating solutions for rural populations and advocating for STEM
          education and gender equality.
        </p>

        <div className="flex flex-col items-center justify-center w-full text-center lg:block lg:text-left">
          <NowPlaying />
          <HealthData />

          <div className="my-8 flex flex-col gap-2">
            <StyledLink external href="/resume.pdf">
              Read my resume {"->"}
            </StyledLink>
            <StyledLink href="/#contact">Contact me {"->"}</StyledLink>
          </div>
        </div>
      </div>

      <Image
        src={headshot}
        alt="Selfie of Juan Almanza, a High School student from Colombia"
        className="w-40 rounded-full lg:rounded-none mt-10 lg:mt-0 lg:w-1/2 lg:min-h-screen object-cover"
        priority
      />
    </section>
  );
}
