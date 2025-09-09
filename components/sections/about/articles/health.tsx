const lifeCycleData = [
  {
    stage: "Be Born",
    icon: "👶",
    challenge: "Maternal mortality",
    deaths: "260,000 women die annually (1 every 2 minutes)",
    prevention: "Skilled birth attendance, emergency obstetric care",
    description:
      "Over 99% of maternal deaths occur in low- and lower-middle–income countries",
    source:
      "https://www.unfpa.org/publications/trends-maternal-mortality-2000-2023",
    sourceName: "UNFPA / WHO"
  },
  {
    stage: "Grow",
    icon: "🧒",
    challenge: "Child survival",
    deaths: "4.8M children under 5 died in 2023",
    prevention: "Vaccination, clean water, nutrition, basic healthcare",
    description:
      "13,100 children die daily — mostly from preventable diseases like pneumonia, diarrhea & malaria",
    source: "https://data.unicef.org/topic/child-survival/under-five-mortality",
    sourceName: "UNICEF"
  },
  {
    stage: "Develop",
    icon: "👦",
    challenge: "Tuberculosis",
    deaths: "1.25M TB deaths globally in 2023 (deadliest infectious disease)",
    prevention: "Early diagnosis, treatment access, improved nutrition",
    description: "10.8M people developed TB in 2023 — including 1.3M children",
    source: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
    sourceName: "WHO"
  },
  {
    stage: "Reproduce",
    icon: "👨‍👩‍👧‍👦",
    challenge: "HIV/AIDS",
    deaths: "630,000 AIDS-related deaths in 2023",
    prevention: "Antiretroviral therapy (ART), education, family planning",
    description:
      "1.3M new HIV infections despite 70% decline in AIDS deaths since 2004",
    source: "https://www.unaids.org/en/resources/fact-sheet",
    sourceName: "UNAIDS"
  },
  {
    stage: "Live & Die",
    icon: "⚰️",
    challenge: "Noncommunicable diseases (NCDs)",
    deaths: "18M premature deaths under age 70 in 2021",
    prevention:
      "Primary care, early screening for heart disease, cancer, diabetes & lung conditions",
    description:
      "82% of these premature NCD deaths occur in low- and middle-income countries",
    source:
      "https://www.who.int/data/gho/data/themes/topics/sdg-target-3_4-noncommunicable-diseases-and-mental-health",
    sourceName: "WHO"
  }
];

export function PreventableDeathsInfographic() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div>
        <h3 className="text-lg font-medium mb-1">A Life Cycle Interrupted</h3>
        <p className="text-sm text-gray-600">
          Due to inequality in healthcare access, millions never complete the
          natural life cycle.
        </p>
      </div>

      <div className="space-y-3">
        {lifeCycleData.map((stage, index) => (
          <div key={index} className="flex gap-3 py-1">
            <span className="text-lg">{stage.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{stage.stage}</span>
                {stage.source && (
                  <a
                    href={stage.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    {stage.sourceName}
                  </a>
                )}
              </div>
              <p className="text-sm text-red-600 mb-1">{stage.deaths}</p>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HealthArticle() {
  return (
    <article className="w-full rounded-lg bg-gradient-to-br from-red-100 via-red-200 to-rose-50 p-6 shadow-md space-y-5">
      <h3 className="text-2xl font-bold mb-2">
        Health Equity: A Matter of Life and Death
      </h3>
      <p className="leading-relaxed">
        Every year, over{" "}
        <span className="font-bold italic">2.7 million people</span> die from
        diseases that are entirely preventable with basic healthcare access.
        Tuberculosis, malaria, HIV/AIDS, and vaccine-preventable diseases
        continue to devastate communities in resource-poor settings, not because
        we lack the medical knowledge, but because we lack equitable
        distribution of resources.
        <sup>
          <a
            href="https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-800 underline hover:no-underline"
          >
            [1]
          </a>
        </sup>
      </p>

      <div className="mt-6">
        <PreventableDeathsInfographic />
      </div>

      <p className="leading-relaxed">
        The disparity is staggering: children in high-income countries receive
        life-saving vaccines as routine care, while children in low-income
        countries die from diseases eradicated decades ago elsewhere. Access to
        clean water, basic sanitation, and essential medicines shouldn't depend
        on geographic location or economic status.
        <sup>
          <a
            href="https://www.unicef.org/reports/state-worlds-children-2023"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-800 underline hover:no-underline"
          >
            [2]
          </a>
        </sup>
      </p>

      <p className="leading-relaxed">
        Through my work with <span className="font-semibold">ASOFI</span>, we're
        developing AI-powered health education platforms to reach underserved
        rural communities. But technology alone isn't enough. We need systemic
        change: stronger health systems, increased funding for global health,
        and most importantly, political will to prioritize health equity as a
        human right, not a privilege.
      </p>

      <div className="mt-6 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-800 underline hover:no-underline"
            >
              World Health Organization, "Global Health Observatory data
              repository," 2023.
            </a>
          </li>
          <li>
            <a
              href="https://www.unicef.org/reports/state-worlds-children-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-800 underline hover:no-underline"
            >
              UNICEF, "The State of the World's Children 2023: For every child,
              vaccination," 2023.
            </a>
          </li>
        </ol>
      </div>
    </article>
  );
}
