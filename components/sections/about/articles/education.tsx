"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const literacyData = [
  {
    region: "Sub-Saharan Africa",
    "Adult Literacy Rate": 67,
    "Youth Literacy Rate": 77,
    "Out of School Children": 98000000
  },
  {
    region: "South Asia",
    "Adult Literacy Rate": 74,
    "Youth Literacy Rate": 89,
    "Out of School Children": 26000000
  },
  {
    region: "Latin America",
    "Adult Literacy Rate": 94,
    "Youth Literacy Rate": 98,
    "Out of School Children": 7000000
  },
  {
    region: "Developed Countries",
    "Adult Literacy Rate": 99,
    "Youth Literacy Rate": 99,
    "Out of School Children": 2000000
  }
];

export function GlobalLiteracyChart() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Global Literacy Rates by Region (2023)
        </h3>
        <p className="text-sm text-gray-600">
          773 million adults worldwide lack basic literacy skills — 
          two-thirds of them are women.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart
            data={literacyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="region" 
              stroke="#6b7280"
              angle={-20}
              textAnchor="end"
              height={100}
            />
            <YAxis
              label={{ value: "Literacy Rate (%)", angle: -90, position: "insideLeft" }}
              stroke="#6b7280"
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value, name) => [
                name === "Out of School Children" 
                  ? `${value.toLocaleString()} children`
                  : `${value}%`,
                name
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem"
              }}
            />
            <Bar dataKey="Adult Literacy Rate" fill="#3b82f6" />
            <Bar dataKey="Youth Literacy Rate" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm font-medium text-blue-900">258 million</p>
          <p className="text-xs text-blue-700">Children out of school globally</p>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm font-medium text-blue-900">617 million</p>
          <p className="text-xs text-blue-700">Children not meeting minimum proficiency</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
        <p>
          Source: UNESCO Institute for Statistics (2023) - Global Education Monitoring Report
        </p>
      </div>
    </div>
  );
}

export function EducationArticle() {
  return (
    <article className="w-full rounded-lg bg-gradient-to-br from-blue-100 via-blue-200 to-sky-50 p-6 shadow-md space-y-5">
      <h3 className="text-2xl font-bold mb-2">
        Education for All: Breaking the Cycle of Poverty
      </h3>
      <p className="leading-relaxed">
        Education is the most powerful tool for breaking intergenerational poverty, 
        yet <span className="font-bold italic">258 million children</span> worldwide 
        are denied this fundamental right. In regions where I've worked, I've seen 
        brilliant minds unable to reach their potential simply because they were born 
        in the wrong zip code.
        <sup>
          <a
            href="https://www.unesco.org/gem-report/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 underline hover:no-underline"
          >
            [1]
          </a>
        </sup>
      </p>

      <div className="mt-6">
        <GlobalLiteracyChart />
      </div>

      <p className="leading-relaxed">
        The digital divide exacerbates educational inequality. While students in 
        developed countries transitioned to online learning during COVID-19, 
        <span className="font-bold italic">463 million children</span> had no access 
        to remote learning opportunities. In rural Colombia, I've witnessed entire 
        communities sharing a single internet connection, with students walking hours 
        to access educational content.
        <sup>
          <a
            href="https://www.unicef.org/press-releases/covid-19-least-third-worlds-schoolchildren-unable-access-remote-learning-during"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 underline hover:no-underline"
          >
            [2]
          </a>
        </sup>
      </p>

      <p className="leading-relaxed">
        Through initiatives like <span className="font-semibold">competitive programming 
        workshops</span> and <span className="font-semibold">AI literacy programs</span>, 
        I'm working to democratize access to quality STEM education. We've reached over 
        1,000 students across Latin America, but this is just the beginning. True 
        educational equity requires systemic change: investment in infrastructure, 
        teacher training, and culturally relevant curricula that prepare students 
        for the jobs of tomorrow, not yesterday.
      </p>

      <div className="mt-6 text-xs text-gray-600">
        <span className="font-semibold">References</span>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>
            <a
              href="https://www.unesco.org/gem-report/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 underline hover:no-underline"
            >
              UNESCO, "Global Education Monitoring Report 2023: Technology in education," 2023.
            </a>
          </li>
          <li>
            <a
              href="https://www.unicef.org/press-releases/covid-19-least-third-worlds-schoolchildren-unable-access-remote-learning-during"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 underline hover:no-underline"
            >
              UNICEF, "COVID-19: At least a third of the world's schoolchildren unable to access remote learning," 2020.
            </a>
          </li>
        </ol>
      </div>
    </article>
  );
}
