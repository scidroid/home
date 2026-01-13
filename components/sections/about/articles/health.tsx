import Image from "next/image";

import asofi from "@/components/sections/about/images/asofi.png";

const lifeCycleData = [
  {
    stage: "Be Born",
    icon: "👶",
    deaths: "260,000 women die annually",
    description: "Over 99% of maternal deaths occur in low-income countries",
    source:
      "https://www.unfpa.org/publications/trends-maternal-mortality-2000-2023",
    sourceName: "UNFPA"
  },
  {
    stage: "Grow",
    icon: "🧒",
    deaths: "4.8M children under 5 died in 2023",
    description: "13,100 children die daily from preventable diseases",
    source: "https://data.unicef.org/topic/child-survival/under-five-mortality",
    sourceName: "UNICEF"
  },
  {
    stage: "Develop",
    icon: "👦",
    deaths: "1.25M TB deaths in 2023",
    description: "Tuberculosis remains the deadliest infectious disease",
    source: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
    sourceName: "WHO"
  },
  {
    stage: "Reproduce",
    icon: "👨‍👩‍👧‍👦",
    deaths: "630,000 AIDS-related deaths in 2023",
    description: "1.3M new HIV infections despite 70% decline since 2004",
    source: "https://www.unaids.org/en/resources/fact-sheet",
    sourceName: "UNAIDS"
  },
  {
    stage: "Live & Age",
    icon: "👴",
    deaths: "18M premature NCD deaths under 70",
    description: "82% occur in low- and middle-income countries",
    source:
      "https://www.who.int/data/gho/data/themes/topics/sdg-target-3_4-noncommunicable-diseases-and-mental-health",
    sourceName: "WHO"
  }
];

function LifeCycleInfographic() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-medium">
          Preventable Deaths by Life Stage
        </h4>
        <p className="text-sm text-gray-600">
          Inequity in healthcare access leads to preventable deaths, combined
          with other factors like unclean water and sanitation.
        </p>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-red-300" />

        <div className="space-y-1">
          {lifeCycleData.map((stage, index) => (
            <div
              key={index}
              className="relative flex items-center gap-4 py-3 pl-12"
            >
              {/* Timeline node */}
              <div className="absolute left-2 w-5 h-5 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>

              {/* Content */}
              <span className="text-xl">{stage.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-gray-900">
                    {stage.stage}
                  </span>
                  <a
                    href={stage.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-700 underline hover:no-underline"
                  >
                    {stage.sourceName}
                  </a>
                </div>
                <p className="text-sm text-red-600 font-medium">
                  {stage.deaths}
                </p>
                <p className="text-xs text-gray-600">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
        <p>
          Sources linked per stage. Data from WHO, UNICEF, UNAIDS, and UNFPA
          (2023-2024).
        </p>
      </div>
    </div>
  );
}

export function HealthArticle() {
  return (
    <article className="w-full rounded-xl bg-linear-to-br from-red-100 via-red-200 to-rose-50 p-6 space-y-6">
      <header>
        <h3 className="text-2xl font-bold text-gray-900">
          Inequity in Healthcare Access
        </h3>
        <p className="text-gray-600 mt-1">
          Every year, over 2.7 million people die from diseases that are
          entirely preventable. Not because we lack medical knowledge, but
          because we lack equitable distribution of these technologies.
        </p>
      </header>

      <LifeCycleInfographic />

      <section className="space-y-3">
        <p className="text-gray-700 leading-relaxed">
          The disparity is staggering. Children in high-income countries receive
          life-saving vaccines as routine care, while children elsewhere die
          from diseases eradicated decades ago.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Geographic lottery</strong> — Access to clean water,
              sanitation, and essential medicines depends on where you&apos;re
              born
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Systemic failures</strong> — Weak health systems in
              resource-poor settings can&apos;t deliver known interventions
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Funding gaps</strong> — Global health receives a fraction
              of what&apos;s needed to close the equity gap
            </span>
          </li>
        </ul>
      </section>

      <section className="bg-white/70 rounded-lg p-4 border border-red-200">
        <div className="flex items-start gap-3">
          <Image
            src={asofi}
            alt=""
            className="h-10 w-10 rounded-lg object-cover shrink-0"
          />
          <div>
            <h4 className="font-semibold text-gray-900">
              Working on this with{" "}
              <a
                href="https://github.com/asofiorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 underline hover:no-underline"
              >
                ASOFI
              </a>
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              We&apos;re developing AI-powered health education platforms to
              reach underserved rural communities. Technology alone isn&apos;t
              enough — we need systemic change and political will to prioritize
              health equity as a human right.
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-4 border-t border-red-200 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              WHO, "Global Health Observatory," 2023
            </a>
          </li>
          <li>
            <a
              href="https://www.unicef.org/reports/state-worlds-children-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              UNICEF, "State of the World&apos;s Children," 2023
            </a>
          </li>
        </ol>
      </footer>
    </article>
  );
}
