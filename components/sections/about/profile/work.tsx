import Image from "next/image";

import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import stanford from "@/components/sections/about/images/stanford.webp";

export function Work() {
  const experiences = [
    {
      logo: pulpoo,
      title: "Founder - Pulpoo",
      description:
        "Building AI-powered productivity tools that help companies scale operations.",
      url: "https://pulpoo.com",
      logoClass: "h-8 w-8"
    },
    {
      logo: asofi,
      title: "Founder - ASOFI",
      description:
        "Democratizing AI for rural communities through accessible educational technology. Sponsored by UN Women.",
      url: "https://github.com/asofiorg",
      logoClass: "h-8 w-8"
    },
    {
      logo: stanford,
      title: "Research Intern - Stanford",
      description:
        "Applied ML research in drug discovery and signal processing.",
      url: "https://stanford.edu",
      logoClass: "h-8 w-auto"
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">Experience</h3>
      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 flex justify-center mt-0.5">
              <a href={exp.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={exp.logo}
                  alt={exp.title.split(" - ")[1]}
                  className={`${exp.logoClass} object-cover ${exp.url !== "https://stanford.edu" ? "rounded-lg" : ""} hover:opacity-80 transition-opacity`}
                />
              </a>
            </div>
            <div>
              <h4 className="font-medium text-base">{exp.title}</h4>
              <p className="text-sm text-gray-600">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
