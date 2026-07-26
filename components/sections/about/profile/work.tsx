import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import { Roles } from "@/components/sections/about/profile/roles";
import type { Role } from "@/components/sections/about/profile/roles";

const WORK: Role[] = [
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

export function Work() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Work</h3>
      <Roles roles={WORK} />
    </section>
  );
}
