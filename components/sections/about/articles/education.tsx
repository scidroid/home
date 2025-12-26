"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList
} from "recharts";

import asofi from "@/components/sections/about/images/asofi.png";

const literacyData = [
  {
    region: "Sub-Saharan Africa",
    short: "Africa",
    adult: 67,
    youth: 77,
    outOfSchool: 98,
    color: "#ef4444",
    highlight: true
  },
  {
    region: "South Asia",
    short: "S. Asia",
    adult: 74,
    youth: 89,
    outOfSchool: 26,
    color: "#f59e0b"
  },
  {
    region: "Latin America",
    short: "LATAM",
    adult: 94,
    youth: 98,
    outOfSchool: 7,
    color: "#3b82f6",
    highlight: true
  },
  {
    region: "Developed",
    short: "Developed",
    adult: 99,
    youth: 99,
    outOfSchool: 2,
    color: "#10b981",
    highlight: true
  }
];

function LiteracyChart() {
  return (
    <div>
      <div className="h-[280px]">
        <ResponsiveContainer>
          <BarChart
            data={literacyData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="short"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={10}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                const gap = 99 - d.adult;

                return (
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md px-2.5 py-1.5 shadow-md text-xs">
                    <p className="font-semibold text-gray-900">{d.region}</p>
                    <p className="text-gray-500">
                      Adult: {d.adult}% · Youth: {d.youth}%
                    </p>
                    <p className="text-gray-400 mt-0.5">
                      <span className="text-red-500">{d.outOfSchool}M</span> children out of school
                    </p>
                    {gap > 0 && (
                      <p className="text-gray-400">
                        <span className="text-red-500">{gap}%</span> gap to universal literacy
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Bar dataKey="adult" name="Adult Literacy" radius={[4, 4, 0, 0]}>
              {literacyData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke={entry.highlight ? "#1e1b4b" : "none"}
                  strokeWidth={entry.highlight ? 2 : 0}
                />
              ))}
              <LabelList
                dataKey="adult"
                position="top"
                fontSize={10}
                fill="#374151"
                formatter={(value) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-6 text-center mt-2">
        <div>
          <p className="text-lg font-bold text-red-600">258M</p>
          <p className="text-xs text-gray-500">Children out of school</p>
        </div>
        <div>
          <p className="text-lg font-bold text-amber-600">773M</p>
          <p className="text-xs text-gray-500">Adults lack basic literacy</p>
        </div>
        <div>
          <p className="text-lg font-bold text-blue-600">2/3</p>
          <p className="text-xs text-gray-500">Are women</p>
        </div>
      </div>
    </div>
  );
}

export function EducationArticle() {
  return (
    <article className="w-full rounded-xl bg-linear-to-br from-blue-100 via-blue-200 to-sky-50 p-6 space-y-6">
      {/* Header */}
      <header>
        <h3 className="text-2xl font-bold text-gray-900">
          Education: Breaking the Cycle of Poverty
        </h3>
        <p className="text-gray-600 mt-1">
          Education is the most powerful tool for breaking intergenerational
          poverty, yet 258 million children worldwide are denied this fundamental
          right — not because we lack knowledge, but because of where they were born.
        </p>
      </header>

      {/* Chart */}
      <section className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <h4 className="text-lg font-medium">
            Global Adult Literacy Rates
          </h4>
          <p className="text-sm text-gray-600">
            Sub-Saharan Africa faces the largest gap. Hover for details on each region.
          </p>
        </div>
        <LiteracyChart />
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
          <p>
            Source: UNESCO Institute for Statistics (2023).
          </p>
        </div>
      </section>

      {/* Analysis */}
      <section className="space-y-3">
        <p className="text-gray-700 leading-relaxed">
          The digital divide exacerbates educational inequality. While some
          transitioned to online learning, others had no access at all.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Geographic lottery</strong> — Brilliant minds unable to
              reach their potential simply because they were born in the wrong
              zip code
              <sup>
                <a
                  href="https://www.unesco.org/gem-report/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:no-underline ml-0.5"
                >
                  [1]
                </a>
              </sup>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Digital divide</strong> — 463 million children had no
              access to remote learning during COVID-19
              <sup>
                <a
                  href="https://www.unicef.org/press-releases/covid-19-least-third-worlds-schoolchildren-unable-access-remote-learning-during"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:no-underline ml-0.5"
                >
                  [2]
                </a>
              </sup>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Infrastructure gaps</strong> — Entire communities sharing
              a single internet connection, students walking hours to access
              content
            </span>
          </li>
        </ul>
      </section>

      {/* ASOFI CTA */}
      <section className="bg-white/70 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Image
            src={asofi}
            alt=""
            className="h-10 w-10 rounded-lg object-cover shrink-0"
          />
          <div>
            <h4 className="font-semibold text-gray-900">
              Democratizing education with{" "}
              <a
                href="https://github.com/asofiorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:no-underline"
              >
                ASOFI
              </a>
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              Through competitive programming workshops and AI literacy programs,
              we&apos;ve reached over 1,000 students across Latin America. True
              educational equity requires systemic change — investment in
              infrastructure, teacher training, and culturally relevant curricula.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <footer className="pt-4 border-t border-blue-200 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.unesco.org/gem-report/en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              UNESCO, &quot;Global Education Monitoring Report,&quot; 2023
            </a>
          </li>
          <li>
            <a
              href="https://www.unicef.org/press-releases/covid-19-least-third-worlds-schoolchildren-unable-access-remote-learning-during"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              UNICEF, &quot;Remote Learning Access,&quot; 2020
            </a>
          </li>
        </ol>
      </footer>
    </article>
  );
}

// Keep for backwards compatibility
export { LiteracyChart as GlobalLiteracyChart };
