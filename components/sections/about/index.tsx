import { LeftColumn } from "./layout/left-column";
import { RightColumn } from "./layout/right-column";

export function About() {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-8 items-start lg:items-stretch my-8 px-4 lg:px-8 lg:my-16">
      <LeftColumn />
      <RightColumn />
    </section>
  );
}
