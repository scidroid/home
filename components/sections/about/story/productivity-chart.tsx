"use client";

import { useState } from "react";

import { useIsMobile } from "@/hooks/mobile";

import {
  OECD,
  midHours,
  midWages,
  productivityData,
  productivityRegions
} from "./data";

const X_MIN = 1300;
const X_MAX = 2300;
const Y_MIN = 15000;
const Y_MAX = 100000;

function shortLabel(name: string, isMobile: boolean) {
  if (isMobile) {
    if (name === "Colombia") return "COL";
    if (name === "United States") return "USA";
    if (name === "OECD Average") return "OECD";
    return "";
  }
  if (name === "Chile") return "Chile";
  if (name === "Colombia") return "Colombia";
  if (name === "OECD Average") return "OECD";
  if (name === "Switzerland") return "Switzerland";
  if (name === "United States") return "USA";
  return "";
}

export function ProductivityChart() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);

  const width = 680;
  const height = isMobile ? 300 : 380;
  const pad = isMobile
    ? { top: 10, right: 16, bottom: 42, left: 48 }
    : { top: 12, right: 24, bottom: 48, left: 56 };

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const x = (hours: number) =>
    pad.left + ((hours - X_MIN) / (X_MAX - X_MIN)) * plotW;
  const y = (wages: number) =>
    pad.top + plotH - ((wages - Y_MIN) / (Y_MAX - Y_MIN)) * plotH;

  const xTicks = isMobile ? [1400, 1800, 2200] : [1400, 1600, 1800, 2000, 2200];
  const yTicks = isMobile
    ? [20000, 60000, 100000]
    : [20000, 40000, 60000, 80000, 100000];

  const data = isMobile
    ? productivityData.filter(d => d.highlight)
    : productivityData;

  const hoveredPoint = hovered !== null ? data[hovered] : null;

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200/40 p-5">
      <div className="mb-4 pb-3 border-b border-amber-200/40">
        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
          The Productivity Paradox
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Annual hours worked vs. wages across OECD nations
        </p>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-label="Scatter chart of annual hours worked versus annual wages for OECD countries. Countries that work fewer hours tend to earn more."
        >
          {/* Quadrants */}
          <rect
            x={x(X_MIN)}
            y={y(Y_MAX)}
            width={x(midHours) - x(X_MIN)}
            height={y(midWages) - y(Y_MAX)}
            fill="#22c55e"
            fillOpacity={0.08}
          />
          <rect
            x={x(midHours)}
            y={y(Y_MAX)}
            width={x(X_MAX) - x(midHours)}
            height={y(midWages) - y(Y_MAX)}
            fill="#eab308"
            fillOpacity={0.04}
          />
          <rect
            x={x(X_MIN)}
            y={y(midWages)}
            width={x(midHours) - x(X_MIN)}
            height={y(Y_MIN) - y(midWages)}
            fill="#6b7280"
            fillOpacity={0.03}
          />
          <rect
            x={x(midHours)}
            y={y(midWages)}
            width={x(X_MAX) - x(midHours)}
            height={y(Y_MIN) - y(midWages)}
            fill="#dc2626"
            fillOpacity={0.08}
          />
          <text
            x={x(X_MIN) + 8}
            y={y(Y_MAX) + 16}
            fontSize={isMobile ? 11 : 12}
            fontWeight={700}
            fill="#15803d"
          >
            Ideal
          </text>
          <text
            x={x(X_MAX) - 8}
            y={y(Y_MIN) - 8}
            fontSize={isMobile ? 11 : 12}
            fontWeight={700}
            fill="#b91c1c"
            textAnchor="end"
          >
            Trap
          </text>

          {/* Grid + ticks */}
          {xTicks.map(t => (
            <g key={t}>
              <line
                x1={x(t)}
                y1={pad.top}
                x2={x(t)}
                y2={pad.top + plotH}
                stroke="#e5e7eb"
                strokeOpacity={0.7}
                strokeDasharray="3 3"
              />
              <text
                x={x(t)}
                y={pad.top + plotH + 16}
                fontSize={10}
                fill="#9ca3af"
                textAnchor="middle"
              >
                {t.toLocaleString()}
              </text>
            </g>
          ))}
          {yTicks.map(t => (
            <g key={t}>
              <line
                x1={pad.left}
                y1={y(t)}
                x2={pad.left + plotW}
                y2={y(t)}
                stroke="#e5e7eb"
                strokeOpacity={0.7}
                strokeDasharray="3 3"
              />
              <text
                x={pad.left - 8}
                y={y(t) + 3}
                fontSize={10}
                fill="#9ca3af"
                textAnchor="end"
              >
                ${(t / 1000).toFixed(0)}k
              </text>
            </g>
          ))}

          {/* Axis titles */}
          <text
            x={pad.left + plotW / 2}
            y={height - 8}
            fontSize={isMobile ? 9 : 10}
            fill="#6b7280"
            textAnchor="middle"
          >
            Hours worked per year →
          </text>
          <text
            x={14}
            y={pad.top + plotH / 2}
            fontSize={isMobile ? 9 : 10}
            fill="#6b7280"
            textAnchor="middle"
            transform={`rotate(-90 14 ${pad.top + plotH / 2})`}
          >
            Annual wages (USD PPP) →
          </text>

          {/* Points */}
          {data.map((d, i) => {
            const label = shortLabel(d.name, isMobile);
            return (
              <g key={d.name}>
                {label && (
                  <text
                    x={x(d.hours) - (d.highlight ? 11 : 9)}
                    y={y(d.wages) + 3}
                    fontSize={9}
                    fill="#374151"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                )}
                <circle
                  cx={x(d.hours)}
                  cy={y(d.wages)}
                  r={d.highlight ? 7 : 5}
                  fill={d.color}
                  stroke={d.highlight ? "#1e1b4b" : "none"}
                  strokeWidth={d.highlight ? 2 : 0}
                />
                {/* Oversized invisible hit target */}
                <circle
                  cx={x(d.hours)}
                  cy={y(d.wages)}
                  r={14}
                  fill="transparent"
                  tabIndex={0}
                  role="img"
                  aria-label={`${d.name}: ${d.hours.toLocaleString()} hours, $${d.wages.toLocaleString()}`}
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredPoint &&
          (() => {
            const hourlyRate = hoveredPoint.wages / hoveredPoint.hours;
            const hoursVsOECD =
              ((hoveredPoint.hours - OECD.hours) / OECD.hours) * 100;
            const wagesVsOECD =
              ((hoveredPoint.wages - OECD.wages) / OECD.wages) * 100;
            const isOECD = hoveredPoint.name === "OECD Average";
            const leftPct = (x(hoveredPoint.hours) / width) * 100;
            const topPct = (y(hoveredPoint.wages) / height) * 100;
            const flipX = leftPct > 60;
            return (
              <div
                className="absolute pointer-events-none bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs z-10"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: `translate(${flipX ? "calc(-100% - 12px)" : "12px"}, -50%)`
                }}
              >
                <p className="font-semibold text-gray-900">
                  {hoveredPoint.name}
                </p>
                <p className="text-gray-500 mt-0.5 whitespace-nowrap">
                  {hoveredPoint.hours.toLocaleString()} hrs · $
                  {hoveredPoint.wages.toLocaleString()} ·{" "}
                  <span className="font-semibold">
                    ${hourlyRate.toFixed(0)}/hr
                  </span>
                </p>
                {!isOECD && (
                  <p className="text-gray-400 mt-1 pt-1 border-t border-gray-100 whitespace-nowrap">
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
          })()}
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
