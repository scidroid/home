import { LeftColumn } from "./layout/left-column";
import { RightColumn } from "./layout/right-column";

export function About() {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-8 items-start my-8 mx-2 lg:my-16 lg:mx-4">
      <LeftColumn />
      <RightColumn />
    </section>
  );
}
