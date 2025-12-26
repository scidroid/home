"use client";

import Image from "next/image";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Label,
  ReferenceArea,
  LabelList
} from "recharts";

import pulpoo from "@/components/sections/about/images/pulpoo.webp";

const data = [
  // LATIN AMERICA - Colombia highlighted
  { name: "Chile", hours: 1919, wages: 38130, region: "Latin America", color: "#8b5cf6", highlight: true },
  { name: "Colombia", hours: 2252, wages: 28838, region: "Latin America", color: "#8b5cf6", highlight: true },
  { name: "Mexico", hours: 2193, wages: 20423, region: "Latin America", color: "#8b5cf6" },

  // NORTH AMERICA
  { name: "United States", hours: 1796, wages: 82933, region: "North America", color: "#3b82f6", highlight: true },
  { name: "Canada", hours: 1697, wages: 69417, region: "North America", color: "#3b82f6" },

  // ASIA
  { name: "Korea", hours: 1865, wages: 50947, region: "Asia", color: "#0ea5e9" },
  { name: "Japan", hours: 1617, wages: 49446, region: "Asia", color: "#0ea5e9" },

  // EUROPE (key examples)
  { name: "Switzerland", hours: 1532, wages: 87468, region: "Europe", color: "#10b981", highlight: true },
  { name: "Germany", hours: 1331, wages: 69433, region: "Europe", color: "#10b981" },
  { name: "France", hours: 1491, wages: 60608, region: "Europe", color: "#10b981" },
  { name: "Spain", hours: 1634, wages: 54564, region: "Europe", color: "#10b981" },
  { name: "Poland", hours: 1785, wages: 44211, region: "Europe", color: "#10b981" },

  // OCEANIA
  { name: "Australia", hours: 1627, wages: 70736, region: "Oceania", color: "#f59e0b" },

  // AVERAGES
  { name: "OECD Average", hours: 1736, wages: 61147, region: "Organization", color: "#6b7280", highlight: true }
];

const regions = [
  { name: "Latin America", color: "#8b5cf6" },
  { name: "North America", color: "#3b82f6" },
  { name: "Asia", color: "#0ea5e9" },
  { name: "Europe", color: "#10b981" },
  { name: "Oceania", color: "#f59e0b" },
  { name: "OECD Average", color: "#6b7280" }
];

const midHours = 1750;
const midWages = 55000;

// OECD baseline for comparisons
const OECD = { hours: 1736, wages: 61147 };

function ProductivityChart() {
  return (
    <div>
      <div className="h-[380px]">
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            {/* Quadrants - only Ideal and Trap labeled */}
            <ReferenceArea
              x1={1300}
              x2={midHours}
              y1={midWages}
              y2={100000}
              fill="#22c55e"
              fillOpacity={0.1}
              label={{ value: "Ideal", position: "insideTopLeft", fontSize: 11, fill: "#15803d", fontWeight: 600 }}
            />
            <ReferenceArea
              x1={midHours}
              x2={2300}
              y1={midWages}
              y2={100000}
              fill="#eab308"
              fillOpacity={0.05}
            />
            <ReferenceArea
              x1={1300}
              x2={midHours}
              y1={15000}
              y2={midWages}
              fill="#6b7280"
              fillOpacity={0.04}
            />
            <ReferenceArea
              x1={midHours}
              x2={2300}
              y1={15000}
              y2={midWages}
              fill="#dc2626"
              fillOpacity={0.1}
              label={{ value: "Trap", position: "insideBottomRight", fontSize: 11, fill: "#b91c1c", fontWeight: 600 }}
            />

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              type="number"
              dataKey="hours"
              domain={[1300, 2300]}
              stroke="#6b7280"
              fontSize={10}
              tickFormatter={(v) => v.toLocaleString()}
            >
              <Label
                value="Hours worked per year →"
                position="bottom"
                offset={15}
                style={{ fontSize: 11, fill: "#6b7280" }}
              />
            </XAxis>

            <YAxis
              type="number"
              dataKey="wages"
              domain={[15000, 100000]}
              stroke="#6b7280"
              fontSize={10}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            >
              <Label
                value="Annual wages (USD PPP) →"
                angle={-90}
                position="insideLeft"
                offset={5}
                style={{ fontSize: 11, fill: "#6b7280", textAnchor: "middle" }}
              />
            </YAxis>

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                const hourlyRate = d.wages / d.hours;
                const hoursVsOECD = ((d.hours - OECD.hours) / OECD.hours) * 100;
                const wagesVsOECD = ((d.wages - OECD.wages) / OECD.wages) * 100;
                const isOECD = d.name === "OECD Average";

                return (
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md px-2.5 py-1.5 shadow-md text-xs">
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <p className="text-gray-500">
                      {d.hours.toLocaleString()} hrs · ${d.wages.toLocaleString()} · <span className="font-medium">${hourlyRate.toFixed(0)}/hr</span>
                    </p>
                    {!isOECD && (
                      <p className="text-gray-400 mt-0.5">
                        <span className={hoursVsOECD > 0 ? "text-red-500" : "text-green-500"}>
                          {hoursVsOECD > 0 ? "+" : ""}{hoursVsOECD.toFixed(0)}% hrs
                        </span>
                        {" · "}
                        <span className={wagesVsOECD < 0 ? "text-red-500" : "text-green-500"}>
                          {wagesVsOECD > 0 ? "+" : ""}{wagesVsOECD.toFixed(0)}% pay
                        </span>
                        {" vs OECD"}
                      </p>
                    )}
                  </div>
                );
              }}
            />

            <Scatter data={data} fill="#8b5cf6">
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke={entry.highlight ? "#1e1b4b" : "none"}
                  strokeWidth={entry.highlight ? 2 : 0}
                  r={entry.highlight ? 8 : 5}
                />
              ))}
              <LabelList
                dataKey="name"
                position="left"
                fontSize={10}
                fill="#374151"
                formatter={(value) => {
                  if (value === "Chile") return "Chile";
                  if (value === "Colombia") return "Colombia";
                  if (value === "OECD Average") return "OECD";
                  if (value === "Switzerland") return "Switzerland";
                  if (value === "United States") return "USA";
                  return "";
                }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] mt-2">
        {regions.map((region) => (
          <div key={region.name} className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: region.color }}
            />
            <span className="text-gray-600">{region.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductivityArticle() {
  return (
    <article className="w-full rounded-xl bg-linear-to-br from-purple-100 via-purple-200 to-purple-50 p-6 space-y-6">
      {/* Header */}
      <header>
        <h3 className="text-2xl font-bold text-gray-900">
          The Productivity Gap in Latin America
        </h3>
        <p className="text-gray-600 mt-1">
          Latin America faces significant productivity challenges compared to OECD
          economies. Workers put in among the highest hours globally, yet
          compensation remains below international standards.
        </p>
      </header>

      {/* Chart */}
      <section className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <h4 className="text-lg font-medium">
            The Productivity Quadrant
          </h4>
          <p className="text-sm text-gray-600">
            Colombia sits in the <strong className="text-red-700">Trap</strong>: working the most hours for the lowest pay.
            The <strong className="text-green-700">Ideal</strong> is top-left — fewer hours, higher wages.
          </p>
        </div>
        <ProductivityChart />
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
          <p>
            Source: OECD Data Explorer (2024). Hover over points for details.
          </p>
        </div>
      </section>

      {/* Analysis */}
      <section className="space-y-3">
        <p className="text-gray-700 leading-relaxed">
          These systemic challenges stem from multiple interconnected factors that
          have persisted for decades across the region.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>
              <strong>Limited education access</strong> — Less than 20% of Latin
              Americans complete higher education, restricting workforce capabilities
              <sup>
                <a
                  href="https://publications.iadb.org/en/publications/english/viewer/The-state-of-education-in-Latin-America-and-the-Caribbean-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 underline hover:no-underline ml-0.5"
                >
                  [1]
                </a>
              </sup>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>
              <strong>Infrastructure gaps</strong> — Inadequate transportation,
              energy, and digital infrastructure limit operational efficiency
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>
              <strong>Economic instability</strong> — Volatility creates uncertain
              conditions where compensation often doesn&apos;t match living costs
              <sup>
                <a
                  href="https://blogs.worldbank.org/en/latinamerica/low-productivity-growth-latin-america-caribbean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 underline hover:no-underline ml-0.5"
                >
                  [2]
                </a>
              </sup>
            </span>
          </li>
        </ul>
      </section>

      {/* Pulpoo CTA */}
      <section className="bg-white/70 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start gap-3">
          <Image
            src={pulpoo}
            alt=""
            className="h-10 w-10 rounded-lg object-cover shrink-0"
          />
          <div>
            <h4 className="font-semibold text-gray-900">
              Building a solution with{" "}
              <a
                href="https://pulpoo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline hover:no-underline"
              >
                Pulpoo
              </a>
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              With some friends, I&apos;ve been working on an AI-powered platform
              that integrates into day-to-day workflows, helping employees get work
              done in less time while giving employers real insights into business
              operations. Currently in private beta, serving tens of companies with
              thousands of employees.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <footer className="pt-4 border-t border-purple-200 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://publications.iadb.org/en/publications/english/viewer/The-state-of-education-in-Latin-America-and-the-Caribbean-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              IDB, "The State of Education in Latin America," 2024
            </a>
          </li>
          <li>
            <a
              href="https://blogs.worldbank.org/en/latinamerica/low-productivity-growth-latin-america-caribbean"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              World Bank, "Low Productivity in Latin America," 2023
            </a>
          </li>
        </ol>
      </footer>
    </article>
  );
}
