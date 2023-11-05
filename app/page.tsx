import { ContactForm } from "@/components/ContactForm";
import { Gallery } from "@/components/Gallery";
import { Profile } from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <Profile />
      <Gallery />
      <ContactForm />
    </main>
  );
}
