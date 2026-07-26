import Image from "next/image";

import paho from "@/components/sections/about/images/paho.png";
import stanford from "@/components/sections/about/images/stanford.webp";
import { Emoji } from "@/components/ui/emoji";

export function Research() {
  const projects = [
    {
      logo: paho,
      role: "Consultant",
      company: "PAHO / WHO",
      description:
        "Data infrastructure for eliminating 30+ diseases across the Americas by 2030.",
      url: "https://www.paho.org/en/elimination-initiative",
      squared: true
    },
    {
      emoji: "🦟",
      role: "Associate Researcher",
      company: "Fundación Chilloa",
      description:
        "Models that fight dengue and yellow fever in vulnerable communities.",
      url: "https://chilloa.org",
      squared: true
    },
    {
      logo: stanford,
      role: "Research Intern",
      company: "Stanford",
      description: "ML research in drug discovery and signal processing.",
      url: "https://www.stanford.edu",
      squared: false
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-1">Research</h3>
      <p className="text-sm text-gray-500 mb-3">
        AI for public health: reaching the people systems miss.
      </p>
      <div className="space-y-3 lg:space-y-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-0 lg:bg-transparent lg:rounded-none group"
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 text-left">
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt=""
                  className={
                    project.squared
                      ? "h-8 w-8 object-cover rounded shrink-0"
                      : "h-auto w-6 object-contain shrink-0"
                  }
                />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                  <Emoji symbol={project.emoji!} className="h-6 w-6" />
                </span>
              )}
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {project.role} <span className="font-normal">at</span>{" "}
                  <span className="underline decoration-gray-300 group-hover:no-underline">
                    {project.company}
                  </span>
                </h4>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
