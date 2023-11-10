import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Gallery } from "@/components/Gallery";
import { Profile } from "@/components/Profile";
import { Projects } from "@/components/Projects";
import { Readings } from "@/components/Readings";

export default function Home() {
  return (
    <main>
      <Profile />
      <Gallery />
      <About />
      <Projects />
      <Readings />
      <ContactForm />
    </main>
  );
}
