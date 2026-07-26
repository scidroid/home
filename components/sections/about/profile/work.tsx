import Image from "next/image";

import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";

export function Work() {
  const experiences = [
    {
      logo: pulpoo,
      role: "Data Engineer",
      company: "Pulpoo",
      description:
        "Data pipelines for enterprise clients, at the AI startup I've grown with since 2023.",
      url: "https://pulpoo.com",
      squared: true
    },
    {
      logo: asofi,
      role: "Co-Founder",
      company: "ASOFI",
      description:
        "Tech for rural Colombia. Part of the UN Women Multistakeholder Leadership Group.",
      url: "https://github.com/asofiorg",
      squared: true
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Work</h3>
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
