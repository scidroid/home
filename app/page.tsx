import { ContactForm } from "@/components/ContactForm";
import { Gallery } from "@/components/Gallery";
import { Profile } from "@/components/Profile";
import { Readings } from "@/components/Readings";

export default function Home() {
  return (
    <main>
      <Profile />
      <Gallery />
      <Readings />
      <ContactForm />
    </main>
  );
}
