"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  midHours,
  midWages,
  OECD,
  productivityData,
  productivityRegions
} from "./data";

export function ProductivityChart() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200/40 p-5">
      <div className="mb-4 pb-3 border-b border-amber-200/40">
        <h4 className="text-sm font-semibold text-gray-900 tracking-tight">
          The Productivity Paradox
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Annual hours worked vs. wages across OECD nations
        </p>
      </div>

      <div className="h-[280px] sm:h-[360px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ScatterChart
            margin={
              isMobile
                ? { top: 5, right: 10, left: 5, bottom: 25 }
                : { top: 10, right: 20, left: 10, bottom: 35 }
            }
          >
            <ReferenceArea
              x1={1300}
              x2={midHours}
              y1={midWages}
              y2={100000}
              fill="#22c55e"
              fillOpacity={0.08}
              label={{
                value: "Ideal",
                position: "insideTopLeft",
                fontSize: isMobile ? 10 : 12,
                fill: "#15803d",
                fontWeight: 700
              }}
            />
            <ReferenceArea
              x1={midHours}
              x2={2300}
              y1={midWages}
              y2={100000}
              fill="#eab308"
              fillOpacity={0.04}
            />
            <ReferenceArea
              x1={1300}
              x2={midHours}
              y1={15000}
              y2={midWages}
              fill="#6b7280"
              fillOpacity={0.03}
            />
            <ReferenceArea
              x1={midHours}
              x2={2300}
              y1={15000}
              y2={midWages}
              fill="#dc2626"
              fillOpacity={0.08}
              label={{
                value: "Trap",
                position: "insideBottomRight",
                fontSize: isMobile ? 10 : 12,
                fill: "#b91c1c",
                fontWeight: 700
              }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.7}
            />
            <XAxis
              type="number"
              dataKey="hours"
              domain={[1300, 2300]}
              stroke="#9ca3af"
              fontSize={isMobile ? 10 : 9}
              tickFormatter={v => v.toLocaleString()}
              tickCount={isMobile ? 4 : undefined}
            >
              <Label
                value="Hours worked per year →"
                position="bottom"
                offset={isMobile ? 6 : 12}
                style={{ fontSize: isMobile ? 9 : 10, fill: "#6b7280" }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="wages"
              domain={[15000, 100000]}
              stroke="#9ca3af"
              fontSize={isMobile ? 10 : 9}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              tickCount={isMobile ? 4 : undefined}
            >
              <Label
                value="Annual wages (USD PPP) →"
                angle={-90}
                position="insideLeft"
                offset={0}
                style={{
                  fontSize: isMobile ? 9 : 10,
                  fill: "#6b7280",
                  textAnchor: "middle"
                }}
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
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <p className="text-gray-500 mt-0.5">
                      {d.hours.toLocaleString()} hrs · $
                      {d.wages.toLocaleString()} ·{" "}
                      <span className="font-semibold">
                        ${hourlyRate.toFixed(0)}/hr
                      </span>
                    </p>
                    {!isOECD && (
                      <p className="text-gray-400 mt-1 pt-1 border-t border-gray-100">
                        <span
                          className={
                            hoursVsOECD > 0 ? "text-red-500" : "text-green-500"
                          }
                        >
                          {hoursVsOECD > 0 ? "+" : ""}
                          {hoursVsOECD.toFixed(0)}% hrs
                        </span>
                        {" · "}
                        <span
                          className={
                            wagesVsOECD < 0 ? "text-red-500" : "text-green-500"
                          }
                        >
                          {wagesVsOECD > 0 ? "+" : ""}
                          {wagesVsOECD.toFixed(0)}% pay
                        </span>
                        {" vs OECD"}
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Scatter
              data={
                isMobile
                  ? productivityData.filter(d => d.highlight)
                  : productivityData
              }
              fill="#8b5cf6"
            >
              {(isMobile
                ? productivityData.filter(d => d.highlight)
                : productivityData
              ).map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke={entry.highlight ? "#1e1b4b" : "none"}
                  strokeWidth={entry.highlight ? 2 : 0}
                  r={entry.highlight ? 7 : 5}
                />
              ))}
              <LabelList
                dataKey="name"
                position="left"
                fontSize={9}
                fill="#374151"
                formatter={value => {
                  const v = String(value);
                  if (isMobile) {
                    if (v === "Colombia") return "COL";
                    if (v === "United States") return "USA";
                    if (v === "OECD Average") return "OECD";
                    return "";
                  }
                  if (v === "Chile") return "Chile";
                  if (v === "Colombia") return "Colombia";
                  if (v === "OECD Average") return "OECD";
                  if (v === "Switzerland") return "Switzerland";
                  if (v === "United States") return "USA";
                  return "";
                }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] mt-3 pt-3 border-t border-amber-200/40">
        {(isMobile
          ? productivityRegions.filter(r =>
              [
                "Latin America",
                "North America",
                "Europe",
                "OECD Average"
              ].includes(r.name)
            )
          : productivityRegions
        ).map(region => (
          <div key={region.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: region.color }}
            />
            <span className="text-gray-500">{region.name}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 text-center mt-2">
        Source: OECD Data Explorer (2024)
      </p>
    </div>
  );
}
