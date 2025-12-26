"use client";

import Image from "next/image";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from "recharts";

import pulpoo from "@/components/sections/about/images/pulpoo.webp";

const impactData = [
  { year: "2019", traditional: 100, tech: 100, community: 100 },
  { year: "2020", traditional: 110, tech: 150, community: 130 },
  { year: "2021", traditional: 115, tech: 280, community: 200 },
  { year: "2022", traditional: 120, tech: 450, community: 320 },
  { year: "2023", traditional: 125, tech: 750, community: 500 },
  { year: "2024", traditional: 130, tech: 1200, community: 800 }
];

const approaches = [
  { name: "Tech-Enabled", color: "#10b981", growth: "12x", key: "tech" },
  { name: "Community-Led", color: "#3b82f6", growth: "8x", key: "community" },
  { name: "Traditional Aid", color: "#ef4444", growth: "1.3x", key: "traditional" }
];

function ImpactChart() {
  return (
    <div>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <LineChart
            data={impactData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              stroke="#6b7280"
              fontSize={11}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={10}
              tickFormatter={(v) => `${v}`}
              domain={[0, 1300]}
            />
            <ReferenceLine
              y={100}
              stroke="#9ca3af"
              strokeDasharray="5 5"
              label={{ value: "Baseline", position: "right", fontSize: 10, fill: "#9ca3af" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;

                return (
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md px-2.5 py-1.5 shadow-md text-xs">
                    <p className="font-semibold text-gray-900">{label}</p>
                    {payload.map((entry, index) => {
                      const growth = ((entry.value as number) / 100).toFixed(1);
                      const name = entry.dataKey === "tech" ? "Tech-Enabled" :
                                   entry.dataKey === "community" ? "Community-Led" :
                                   "Traditional";
                      return (
                        <p key={index} style={{ color: entry.color }}>
                          {name}: <span className="font-medium">{growth}x</span> growth
                        </p>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="tech"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6, stroke: "#1e1b4b", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="community"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="traditional"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3, fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with growth stats */}
      <div className="flex justify-center gap-6 mt-2">
        {approaches.map((approach) => (
          <div key={approach.key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: approach.color }}
            />
            <span className="text-xs text-gray-600">
              {approach.name}{" "}
              <span className="font-bold" style={{ color: approach.color }}>
                {approach.growth}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SolutionsArticle() {
  return (
    <article className="w-full rounded-xl bg-linear-to-br from-green-100 via-green-200 to-emerald-50 p-6 space-y-6">
      {/* Header */}
      <header>
        <h3 className="text-2xl font-bold text-gray-900">
          Building Solutions That Scale
        </h3>
        <p className="text-gray-600 mt-1">
          Traditional top-down aid often creates dependency rather than
          empowerment. Sustainable solutions must be replicable, scalable,
          and community-owned.
        </p>
      </header>

      {/* Chart */}
      <section className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <h4 className="text-lg font-medium">
            Impact Growth: Traditional vs. Scalable
          </h4>
          <p className="text-sm text-gray-600">
            Tech-enabled and community-led solutions show exponential growth
            compared to traditional aid models. Index baseline: 2019 = 100.
          </p>
        </div>
        <ImpactChart />
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
          <p>
            Source: Analysis of development program outcomes (2019-2024).
          </p>
        </div>
      </section>

      {/* Analysis */}
      <section className="space-y-3">
        <p className="text-gray-700 leading-relaxed">
          The most effective solutions combine three key elements that work together.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>
              <strong>Technology for scale</strong> — A single AI-powered system
              can serve thousands of users at a fraction of traditional costs
              <sup>
                <a
                  href="https://www.fao.org/digital-agriculture/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:no-underline ml-0.5"
                >
                  [1]
                </a>
              </sup>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>
              <strong>Local knowledge for relevance</strong> — Solutions developed
              in Colombia can be adapted for Kenya, Bangladesh, or Peru
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>
              <strong>Sustainable business models</strong> — Moving from charity
              to partnership, from temporary relief to permanent change
              <sup>
                <a
                  href="https://www.brookings.edu/articles/why-is-the-world-bank-group-dragging-on-from-billions-to-trillions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:no-underline ml-0.5"
                >
                  [2]
                </a>
              </sup>
            </span>
          </li>
        </ul>
      </section>

      {/* Pulpoo CTA */}
      <section className="bg-white/70 rounded-lg p-4 border border-green-200">
        <div className="flex items-start gap-3">
          <Image
            src={pulpoo}
            alt=""
            className="h-10 w-10 rounded-lg object-cover shrink-0"
          />
          <div>
            <h4 className="font-semibold text-gray-900">
              Scaling impact with{" "}
              <a
                href="https://pulpoo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline hover:no-underline"
              >
                Pulpoo
              </a>
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              We&apos;re building AI-powered tools that integrate into existing
              workflows, providing personalized recommendations based on local
              conditions — all at a fraction of traditional service costs.
              Open-source and designed for adaptation across regions.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <footer className="pt-4 border-t border-green-200 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.fao.org/digital-agriculture/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              FAO, &quot;Digital Agriculture,&quot; 2024
            </a>
          </li>
          <li>
            <a
              href="https://www.brookings.edu/articles/why-is-the-world-bank-group-dragging-on-from-billions-to-trillions/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Brookings, &quot;From Billions to Trillions,&quot; 2023
            </a>
          </li>
        </ol>
      </footer>
    </article>
  );
}

// Keep for backwards compatibility
export { ImpactChart as ScalableImpactChart };
