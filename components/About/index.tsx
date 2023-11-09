import { Card } from "../Card";
import { Award } from "./Award";
import { ListItem } from "./ListItem";

const experienceData = [
  {
    title: "Research Intern @ Stanford",
    description:
      "Researched about audio signal processing and machine learning models to classify audio sources.",
    link: {
      content: "Read the article.",
      url: "https://theinformaticists.com/2023/10/09/unveiling-the-orchestra-a-novel-system-for-audio-separation-and-instrument-identification-in-musical-recordings/"
    }
  },
  {
    title: "Engineering Volunteer @ Virufy",
    description:
      "Worked on building web interfaces and data visualization on COVID-19 data.",
    link: {
      content: "View Virufy website.",
      url: "https://virufy.org/"
    }
  },
  {
    title: "Founder Engineer @ Ninjo",
    description:
      "Builded a full-stack self-managed web application in Next.js and Express for over a year."
  }
];

const asofiData = [
  {
    title: "Principal Engineer",
    description:
      "Leaded the development of all software initiatives inside the organization.",
    link: {
      content: "View code on GitHub.",
      url: "https://github.com/asofiorg/"
    }
  },
  {
    title: "Leadership",
    description:
      "Leaded the operations of the non-profit including research and recruiting.",
    link: { content: "Learn more about ASOFI.", url: "https://asofi.us/" }
  },
  {
    title: "Outreach",
    description:
      "Presented ASOFI mission and work in multiple conferences and research groups in universities."
  }
];

export function About() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-2xl uppercase my-2">About me</h2>
      <p className="font-bold text-6xl">
        I&apos;m building innovative solutions to the most pressing problems in
        Colombia and the world.
      </p>
      <div className="grid grid-cols-2 gap-4 my-8">
        <Card>
          <h3 className="text-3xl font-semibold">My Experience</h3>
          <ul>
            {experienceData.map((experience, key) => (
              <ListItem
                title={experience.title}
                description={experience.description}
                link={experience.link || undefined}
                key={key}
              />
            ))}
          </ul>
        </Card>
        <Card bg="pink-50">
          <h3 className="text-3xl font-semibold">My work at ASOFI</h3>
          <ul>
            {asofiData.map((experience, key) => (
              <ListItem
                title={experience.title}
                description={experience.description}
                link={experience.link || undefined}
                key={key}
              />
            ))}
          </ul>
        </Card>
      </div>
      <div className="flex items-center justify-between my-4">
        <Award
          title="3x National Winner"
          link="http://oc.uan.edu.co/"
          organization="Colombian Olympiad of Computation"
          year="2021, 2022, 2023"
        />
        <Award
          title="3rd Place National"
          link="https://fedesoft.org/vi-concurso-nacional-de-programacion-para-colegios-2022/"
          organization="National Programming Contest"
          year="2022"
        />
        <Award
          title="1st Place Globally"
          link="https://www.communityaifair.com/2022-23-top-projects"
          organization="Sustainability and Community AI Fair"
          year="2023"
        />
      </div>
    </section>
  );
}
