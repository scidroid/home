import { About } from "@/components/about";
import { ContactForm } from "@/components/contact";
import { Gallery } from "@/components/gallery";
import { Profile } from "@/components/profile";
import { Readings } from "@/components/readings";

export default function Home() {
  return (
    <>
      <Profile />
      <Gallery />
      <About />
      <Readings />
      <ContactForm />
    </>
  );
}
