import Image from "next/image";

import headshot from "@/public/headshot.jpg";
import { NowPlaying } from "./NowPlaying";
import { HealthData } from "./Health";
import { Subtitle } from "./Subtitle";
import { Age } from "./Age";
import { StyledLink } from "@/components/StyledLink";

export function Profile() {
  return (
    <section className="w-full min-h-screen flex items-center justify-between">
      <div className="w-1/2 ml-8 text-neutral-700">
        <h1 className="text-7xl font-extrabold mb-2 max-w-xl">Juan Almanza</h1>
        <Subtitle />

        <p className="text-xl max-w-xl my-8">
          Juan is a <Age /> years old passionate High School student from
          Colombia with solid leadership and engineering skills. Focused on
          creating solutions for rural populations and advocating for STEM
          education and gender equality.
        </p>

        <NowPlaying />
        <HealthData />

        <div className="my-8 flex flex-col gap-2">
          <StyledLink external href="/resume.pdf">
            Read my resume {"->"}
          </StyledLink>
          <StyledLink href="/#contact">Contact me {"->"}</StyledLink>
        </div>
      </div>

      <Image
        src={headshot}
        alt="Selfie of Juan Almanza, a High School student from Colombia"
        className="w-1/2 min-h-screen object-cover"
        priority
      />
    </section>
  );
}
