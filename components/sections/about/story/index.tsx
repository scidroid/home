import { LifeCycleTimeline } from "@/components/sections/about/story/life-cycle-timeline";
import { WealthPachinko } from "@/components/sections/about/story/pachinko";
import { ProductivityChart } from "@/components/sections/about/story/productivity";
import { ReferenceList } from "@/components/sections/about/story/shared/citation";
import { TextLink } from "@/components/ui/text-link";

// Inline footnote: a normal link that also reveals a small note card on
// hover, in the style of the site's tooltips.
function Note({
  href,
  note,
  children
}: {
  href: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/note relative inline underline decoration-dotted decoration-gray-400 underline-offset-2 hover:decoration-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-max max-w-[19rem] -translate-x-1/2 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 text-sm font-medium leading-relaxed text-gray-700 no-underline shadow-xl backdrop-blur-md opacity-0 motion-safe:transition-opacity group-hover/note:opacity-100 group-focus-visible/note:opacity-100 sm:block"
      >
        {note}
      </span>
    </a>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 leading-relaxed text-[15px]">{children}</p>
  );
}

export function Story() {
  return (
    <article className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
        Why I Build
      </h2>

      <div className="space-y-5">
        <P>
          Life is a lottery. When you are born, you enter a pachinko machine
          that will place you in one of the 4 categories of the wealth
          distribution. Whether you will be able to graduate from college or
          will have to walk every day of your life to collect water is{" "}
          <span className="text-gray-900 font-semibold">
            almost entirely decided without your will
          </span>
          .
        </P>

        <WealthPachinko />

        <P>
          I was born in Colombia, an upper-middle-income country whose economy
          has been flourishing recently, but violence slowed down the
          development of the country. Growing up, insecurity stopped innovation,
          as starting a business would result in extortions from criminal
          groups, and often people were{" "}
          <Note
            href="https://en.wikipedia.org/wiki/%22False_positives%22_scandal"
            note="Yes, this was a thing."
          >
            persecuted and killed either by these groups or the government
          </Note>
          .
        </P>

        <div className="space-y-5">
          <P>
            But this is not unique to Colombia; some of the common denominators
            among the non-high-income countries are violence, gender inequality,
            income inequality, resource-poor healthcare systems, and a plethora
            of{" "}
            <Note
              href="https://www.ucpress.edu/books/infections-and-inequalities/paper"
              note="I highly recommend reading Infections and Inequalities by Paul Farmer."
            >
              interlocked situations that emerge from poverty
            </Note>
            .
          </P>

          <P>
            A good example of this phenomenon is income distribution; here, I
            categorize countries into quadrants based on the relationship
            between what a typical person lives on and the hours a typical
            worker puts in, and how far each country stretches between its best
            and worst paid.
          </P>

          <ProductivityChart />

          <P>
            Some Latin American countries like Colombia or Guatemala are located
            in <span className="text-gray-900 font-semibold">the Trap</span>, a
            high labor hours and low income that perpetuates poverty cycles.
            While others lie on{" "}
            <span className="text-gray-900 font-semibold">the Ideal</span>, a
            low-hours, high-wage state. But when we analyze the differences
            between these two groups, almost none of the variation can be
            attributed to mere biological characteristics but rather to social
            factors.
          </P>

          <P>
            One approach is to see this through the{" "}
            <TextLink href="https://www.who.int/health-topics/social-determinants-of-health">
              Social Determinants of Health
            </TextLink>
            . The naive approach to understanding public health and disease in
            general is to link them to biological factors; however, in practice,
            even for non-communicable diseases,{" "}
            <span className="text-gray-900 font-semibold">
              social rather than biological phenomena drive most infections
            </span>
            .
          </P>

          <LifeCycleTimeline />

          <P>
            When I grew up, I had the opportunity to access vaccines, nutritious
            food, clean water, electricity, cooling and heating systems,
            transportation, internet, high-quality education, and many more. But
            that&apos;s not the situation for everyone. At this moment, in my
            country and around the world, there are millions of kids and adults
            who are suffering (mostly driven by factors they could not control),
            and for a share of the population,{" "}
            <span className="text-gray-900 font-semibold">
              living is not guaranteed
            </span>
            .
          </P>

          <P>
            Fortunately, in recent times, technology and science have been
            developed to improve human life, and{" "}
            <span className="text-gray-900 font-semibold">
              I want to work to continue in that direction
            </span>
            .
          </P>

          <section className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
              References
            </h3>
            <ReferenceList className="space-y-1.5" />
          </section>
        </div>
      </div>
    </article>
  );
}
