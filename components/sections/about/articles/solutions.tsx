"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";

const impactData = [
  {
    year: "2019",
    "Traditional Aid": 100,
    "Tech-Enabled Solutions": 100,
    "Community-Led Programs": 100
  },
  {
    year: "2020",
    "Traditional Aid": 110,
    "Tech-Enabled Solutions": 150,
    "Community-Led Programs": 130
  },
  {
    year: "2021",
    "Traditional Aid": 115,
    "Tech-Enabled Solutions": 280,
    "Community-Led Programs": 200
  },
  {
    year: "2022",
    "Traditional Aid": 120,
    "Tech-Enabled Solutions": 450,
    "Community-Led Programs": 320
  },
  {
    year: "2023",
    "Traditional Aid": 125,
    "Tech-Enabled Solutions": 750,
    "Community-Led Programs": 500
  },
  {
    year: "2024",
    "Traditional Aid": 130,
    "Tech-Enabled Solutions": 1200,
    "Community-Led Programs": 800
  }
];

export function ScalableImpactChart() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Impact Growth: Traditional vs. Scalable Solutions
        </h3>
        <p className="text-sm text-gray-600">
          Technology-enabled and community-led solutions show exponential growth 
          compared to traditional aid models.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <LineChart
            data={impactData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis
              label={{ value: "Impact Index", angle: -90, position: "insideLeft" }}
              stroke="#6b7280"
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Growth"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Traditional Aid" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Tech-Enabled Solutions" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Community-Led Programs" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="bg-green-50 p-2 rounded text-center">
          <p className="text-xs font-medium text-green-900">12x</p>
          <p className="text-xs text-green-700">Tech Impact</p>
        </div>
        <div className="bg-blue-50 p-2 rounded text-center">
          <p className="text-xs font-medium text-blue-900">8x</p>
          <p className="text-xs text-blue-700">Community Impact</p>
        </div>
        <div className="bg-red-50 p-2 rounded text-center">
          <p className="text-xs font-medium text-red-900">1.3x</p>
          <p className="text-xs text-red-700">Traditional Impact</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
        <p>
          Source: Analysis of development program outcomes (2019-2024) - Index baseline: 2019 = 100
        </p>
      </div>
    </div>
  );
}

export function SolutionsArticle() {
  return (
    <article className="w-full rounded-lg bg-gradient-to-br from-green-100 via-green-200 to-emerald-50 p-6 shadow-md space-y-5">
      <h3 className="text-2xl font-bold mb-2">
        Building Solutions That Scale: Beyond Traditional Aid
      </h3>
      <p className="leading-relaxed">
        After years of witnessing well-intentioned aid programs fail to create 
        lasting change, I've learned that <span className="font-bold italic">sustainable 
        solutions must be replicable, scalable, and community-owned</span>. Traditional 
        top-down approaches often create dependency rather than empowerment, while 
        ignoring the innovative potential within the communities they aim to serve.
        <sup>
          <a
            href="https://www.brookings.edu/articles/why-is-the-world-bank-group-dragging-on-from-billions-to-trillions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 underline hover:no-underline"
          >
            [1]
          </a>
        </sup>
      </p>

      <div className="mt-6">
        <ScalableImpactChart />
      </div>

      <p className="leading-relaxed">
        The most effective solutions I've seen combine three elements: 
        <span className="font-bold">technology for scale</span>, 
        <span className="font-bold">local knowledge for relevance</span>, and 
        <span className="font-bold">sustainable business models for longevity</span>. 
        In Colombia, we've seen how a single AI-powered agricultural advisory system 
        can serve thousands of farmers, providing personalized recommendations based 
        on local soil conditions, weather patterns, and market prices — all at a 
        fraction of the cost of traditional extension services.
        <sup>
          <a
            href="https://www.fao.org/digital-agriculture/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 underline hover:no-underline"
          >
            [2]
          </a>
        </sup>
      </p>

      <p className="leading-relaxed">
        Through <span className="font-semibold">open-source projects</span> and 
        <span className="font-semibold">knowledge sharing platforms</span>, we're 
        creating a new model for development: one where solutions developed in 
        rural Colombia can be adapted for use in Kenya, Bangladesh, or Peru. 
        By focusing on building local capacity and creating tools that communities 
        can own and modify, we're moving from aid to empowerment, from charity 
        to partnership, and from temporary relief to permanent change.
      </p>

      <div className="mt-6 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.brookings.edu/articles/why-is-the-world-bank-group-dragging-on-from-billions-to-trillions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 underline hover:no-underline"
            >
              Brookings Institution, "From Billions to Trillions: Transforming Development Finance," 2023.
            </a>
          </li>
          <li>
            <a
              href="https://www.fao.org/digital-agriculture/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 underline hover:no-underline"
            >
              FAO, "Digital Agriculture: Transforming Food Systems in the Digital Age," 2024.
            </a>
          </li>
        </ol>
      </div>
    </article>
  );
} 