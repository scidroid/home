import Image from "next/image";

import { Card } from "../Card";
import { projectsData } from "./data";

export function Projects() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-xl lg:text-2xl uppercase my-2">
        Projects
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        {projectsData.map((project, key) => (
          <a
            key={key}
            href={project.link}
            about="_blank"
            rel="noopener noreferrer"
          >
            <Card hover>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                height={250}
                className="m-auto"
              />
              <h3 className="text-xl lg:text-2xl font-semibold">
                {project.title}
              </h3>
              <p className="text-lg">{project.description}</p>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
