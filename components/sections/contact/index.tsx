import { Form } from "@/components/sections/contact/form";
import { MailLink, SocialLink } from "@/components/sections/contact/links";
import { SectionTitle } from "@/components/ui/section-title";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo
} from "@/components/ui/social-icons";

export function ContactForm() {
  return (
    <section id="contact" className="px-4 lg:px-8 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="text-center lg:text-left mb-6">
            <SectionTitle className="mb-3">Get in touch</SectionTitle>
            <p className="text-base text-gray-600">
              Have a project in mind? Reach out and I&apos;ll get back to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:flex-col lg:gap-3">
            <MailLink />
            <SocialLink
              href="https://github.com/scidroid"
              icon={<GithubLogo />}
              text="/scidroid"
            />
            <SocialLink
              href="https://www.linkedin.com/in/scidroid/"
              icon={<LinkedinLogo />}
              text="/in/scidroid"
            />
            <SocialLink
              href="https://x.com/scidroid"
              icon={<XLogo />}
              text="/scidroid"
            />
            <SocialLink
              href="https://instagram.com/scidroid"
              icon={<InstagramLogo />}
              text="/scidroid"
            />
          </div>
        </div>

        <div>
          <Form />
        </div>
      </div>
    </section>
  );
}
