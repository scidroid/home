import { ContactForm } from "@/components/ContactForm";
import { Profile } from "@/components/Profile";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <Profile />
      <ContactForm />
    </main>
  );
}
