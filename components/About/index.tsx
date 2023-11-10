import { Card } from "../Card";
import { Award } from "./Award";
import { ListItem } from "./ListItem";
import {
  asofiData,
  awardsData,
  educationData,
  experienceData,
  skillsData
} from "./data";

export function About() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-xl lg:text-2xl uppercase my-2">
        About me
      </h2>
      <p className="font-bold text-3xl lg:text-6xl">
        I&apos;m building innovative solutions to the most pressing problems in
        Colombia and the world.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        <Card bg="" className="bg-blue-50">
          <h3 className="text-2xl lg:text-3xl font-semibold">My Experience</h3>
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
        <Card bg="" className="bg-pink-50">
          <h3 className="text-2xl lg:text-3xl font-semibold">
            My work at ASOFI
          </h3>
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
        <Card bg="" className="bg-yellow-50">
          <h3 className="text-2xl lg:text-3xl font-semibold">My skills</h3>
          <ul>
            {skillsData.map((experience, key) => (
              <ListItem
                title={experience.title}
                description={experience.description}
                key={key}
              />
            ))}
          </ul>
        </Card>
        <Card bg="" className="bg-green-50">
          <h3 className="text-2xl lg:text-3xl font-semibold">My education</h3>
          <ul>
            {educationData.map((experience, key) => (
              <ListItem
                title={experience.title}
                description={experience.description}
                key={key}
              />
            ))}
          </ul>
        </Card>
      </div>
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
