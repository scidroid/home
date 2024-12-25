import { Award } from "@/components/sections/about/award";
import { awards } from "@/content/awards";

export function About() {
  return (
    <section className="mx-auto my-8 xl:my-12 max-w-xl xl:max-w-none xl:mx-4">
      <h2 className="font-semibold font-heading text-xl xl:text-2xl uppercase my-2 text-center xl:text-left">
        About me
      </h2>
      <p className="font-bold text-2xl xl:text-5xl text-center xl:text-left my-4 xl:my-8">
        I&apos;m building <span className="shiny">innovative solutions</span> to
        the most pressing challenges in 🇨🇴 Colombia and the 🌎 world.
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-4 xl:flex">
        {awards.map((award, key) => (
          <Award
            key={key}
            title={award.title}
            link={award.link}
            organization={award.organization}
            year={award.year}
          />
        ))}
      </div>
    </section>
  );
}
