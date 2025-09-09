import { About } from "@/components/sections/about";
import { ContactForm } from "@/components/sections/contact";
import { Profile } from "@/components/sections/profile";
import { Projects } from "@/components/sections/projects";
import { Readings } from "@/components/sections/readings";

export default function Home() {
  return (
    <>
      <Profile />
      <About />
      <Projects />
      <Readings />
      <ContactForm />
    </>
  );
}
