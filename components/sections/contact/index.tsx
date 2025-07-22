import { Form } from "@/components/sections/contact/form";
import { MailLink, SocialLink } from "@/components/sections/contact/links";
import { GithubIcon, LinkedinIcon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ContactForm() {
  return (
    <section
      id="contact"
      className="m-4 flex flex-col items-center text-center xl:m-0 xl:max-h-[1000px] xl:flex-row xl:text-left"
    >
      <div className="xl:m-8 xl:w-1/2 max-w-lg xl:max-w-none">
        <h2 className="my-4 text-4xl font-semibold xl:my-8 xl:text-6xl font-heading">
          Get in touch
        </h2>

        <p className="my-4 text-lg text-justify xl:my-8 xl:text-xl">
          Have a project in mind? Looking to partner or work together? Reach out
          through the form and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="my-4 flex gap-4 flex-wrap justify-center xl:flex-col items-center gap-y-2 xl:my-8 xl:items-start">
          <MailLink />
          <SocialLink
            href="https://github.com/scidroid"
            icon={<HugeiconsIcon icon={GithubIcon} />}
            text="/scidroid"
          />
          <SocialLink
            href="https://www.linkedin.com/in/scidroid/"
            icon={<HugeiconsIcon icon={LinkedinIcon} />}
            text="/in/scidroid"
          />
          <SocialLink
            href="https://x.com/scidroid"
            icon={<HugeiconsIcon icon={NewTwitterIcon} />}
            text="/scidroid"
          />
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto xl:mx-0 xl:m-8 xl:w-1/2">
        <Form />
      </div>
    </section>
  );
}
