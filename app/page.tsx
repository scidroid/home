import { About } from "@/components/about";
import { ContactForm } from "@/components/contact";
import { Gallery } from "@/components/gallery";
import { Profile } from "@/components/profile";
import { Projects } from "@/components/projects";
import { Readings } from "@/components/readings";

export default function Home() {
  return (
    <>
      <Profile />
      <Gallery />
      {/*
      <About />
      <Projects />
      */}
      <Readings />
      <ContactForm />
    </>
  );
}
