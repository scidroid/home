import Image from "next/image";

import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import stanford from "@/components/sections/about/images/stanford.webp";

export function Work() {
  const experiences = [
    {
      logo: pulpoo,
      role: "Founder",
      company: "Pulpoo",
      description: "AI-powered productivity tools for scaling operations.",
      url: "https://pulpoo.com",
      squared: true
    },
    {
      logo: asofi,
      role: "Founder",
      company: "ASOFI",
      description: "Democratizing AI education in rural communities.",
      url: "https://github.com/asofiorg",
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
      <h3 className="text-xl font-semibold mb-3">Experience</h3>
      <div className="space-y-3 lg:space-y-4">
        {experiences.map((exp, index) => (
          <a
            key={index}
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-0 lg:bg-transparent lg:rounded-none group"
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 text-left">
              <Image
                src={exp.logo}
                alt=""
                className={
                  exp.squared
                    ? "h-8 w-8 object-cover rounded shrink-0"
                    : "h-auto w-6 object-contain shrink-0"
                }
              />
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {exp.role} <span className="font-normal">at</span>{" "}
                  <span className="underline decoration-gray-300 group-hover:no-underline">
                    {exp.company}
                  </span>
                </h4>
                <p className="text-sm text-gray-500">{exp.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
