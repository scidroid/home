import { About } from "@/components/sections/about";
import { ContactForm } from "@/components/sections/contact";
import { Profile } from "@/components/sections/profile";
import { Readings } from "@/components/sections/readings";

export default function Home() {
  return (
    <>
      <Profile />
      <About />
      <Readings />
      <ContactForm />
    </>
  );
}
