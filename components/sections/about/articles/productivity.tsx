"use client";

import Image from "next/image";

import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  {
    region: "Colombia",
    hours: 2282,
    comp: 29304,
    "Working Hours": 100,
    Compensation: 54,
    raw: { hours: 2282, comp: 29304 }
  },
  {
    region: "Japan",
    hours: 1607,
    comp: 50458,
    "Working Hours": 70,
    Compensation: 94,
    raw: { hours: 1607, comp: 50458 }
  },
  {
    region: "Spain",
    hours: 1653,
    comp: 53954,
    "Working Hours": 72,
    Compensation: 100,
    raw: { hours: 1653, comp: 53954 }
  }
];

export function LatamProductivityChart() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Annual Working Hours vs. Average Wages
        </h3>
        <p className="text-sm text-gray-600 space-y-1">
          Colombian workers work 2,282 hours annually (38% more than Spain) 
          while earning $29,304 USD PPP (46% less than Spain).
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="region" stroke="#6b7280" />
            <YAxis
              label={{ value: "%", position: "insideLeft" }}
              stroke="#6b7280"
            />
            <Tooltip
              formatter={(value, name, { payload }) => [
                name === "Working Hours"
                  ? `${payload.raw.hours} hours/year`
                  : `$${payload.raw.comp.toLocaleString()}/year`,
                name
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem"
              }}
            />
            <Legend />
            <Bar dataKey="Working Hours" fill="#8b5cf6" />
            <Bar dataKey="Compensation" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
        <p>
          Source: OECD Data Explorer (2022) - Annual hours worked and average
          wages in USD PPP.{" "}
          <span className="italic">
            Data is normalized for better interpretation. Hover over bars to see
            actual values.
          </span>
        </p>
      </div>
    </div>
  );
}

export function ProductivityArticle() {
  return (
    <article className="w-full rounded-lg bg-gradient-to-br from-purple-100 via-purple-200 to-purple-50 p-6 shadow-md space-y-5">
      <h3 className="text-2xl font-bold mb-2">
        Low productivity in Latin America
      </h3>
      <p className="leading-relaxed">
        Latin America, and Colombia specifically, faces significant productivity
        challenges compared to OECD economies. Latin American workers have{" "}
        <span className="font-bold italic">among the highest working hours</span>
        {" "}globally, yet compensation levels remain{" "}
        <span className="font-bold italic">below international standards</span> relative to
        hours worked.
        <sup>
          <a
            href="https://blogs.worldbank.org/en/latinamerica/low-productivity-growth-latin-america-caribbean"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-800 underline hover:no-underline"
          >
            [1]
          </a>
        </sup>
      </p>
      <div className="mt-6">
        <LatamProductivityChart />
      </div>

      <p className="leading-relaxed">
        These systemic challenges stem from multiple factors, including limited
        access to quality education, with less than 20% of the population in Latin
        America completing higher education
        <sup>
          <a
            href="https://publications.iadb.org/en/publications/english/viewer/The-state-of-education-in-Latin-America-and-the-Caribbean-2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-800 underline hover:no-underline"
          >
            [2]
          </a>
        </sup>
        . Combined with infrastructure gaps and economic volatility,
        these factors create challenging working conditions where compensation
        often doesn't match the cost of living, and benefits remain limited.
      </p>

      <p className="leading-relaxed">
        With some friends, we have been working on{" "}
        <a
          href="https://pulpoo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-800 underline hover:no-underline"
        >
          <Image
            src={pulpoo}
            alt="Pulpoo"
            className="inline-block h-6 w-6 mr-1 rounded-lg object-cover"
          />
          Pulpoo.com
        </a>
        , a platform that integrates AI in day-to-day jobs to allow employees to
        get work done in less time and provide real insights for employers on
        how their businesses are doing. Pulpoo is currently in private beta,
        serving tens of companies with thousands of employees.
      </p>
      <div className="mt-6 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1">
          <li>
            <a
              href="https://blogs.worldbank.org/en/latinamerica/low-productivity-growth-latin-america-caribbean"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-800 underline hover:no-underline"
            >
              World Bank, "Low productivity growth in Latin America and the
              Caribbean," 2023.
            </a>
          </li>
          <li>
            <a
              href="https://publications.iadb.org/en/publications/english/viewer/The-state-of-education-in-Latin-America-and-the-Caribbean-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-800 underline hover:no-underline"
            >
              Inter-American Development Bank, "The State of Education in Latin
              America and the Caribbean 2024," 2024.
            </a>
          </li>
        </ol>
      </div>
    </article>
  );
}
