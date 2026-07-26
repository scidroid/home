import paho from "@/components/sections/about/images/paho.png";
import stanford from "@/components/sections/about/images/stanford.webp";
import { Roles } from "@/components/sections/about/profile/roles";
import type { Role } from "@/components/sections/about/profile/roles";

const RESEARCH: Role[] = [
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

export function Research() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-1">Research</h3>
      <p className="text-sm text-gray-500 mb-3">
        AI for public health: reaching the people systems miss.
      </p>
      <Roles roles={RESEARCH} />
    </section>
  );
}
