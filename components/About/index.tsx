import { Award } from "./award";
import { awardsData } from "./data";

export function About() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold font-heading text-xl xl:text-2xl uppercase my-2">
        About me
      </h2>
      <p className="font-bold text-3xl xl:text-5xl">
        I&apos;m building <span className="shiny">innovative</span> solutions to
        pressing problems in 🇨🇴 Colombia and the 🌎 world.
      </p>
      <div className="flex flex-wrap items-center justify-between my-4">
        {awardsData.map((award, key) => (
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
