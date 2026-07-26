import { LeftColumn } from "@/components/sections/about/layout/left-column";
import { RightColumn } from "@/components/sections/about/layout/right-column";

export function About() {
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-stretch my-8 px-4 lg:px-8 lg:my-16">
      <LeftColumn />
      <RightColumn />
    </section>
  );
}
