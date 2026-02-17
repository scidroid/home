"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-is-mobile";
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

import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";

// ── Data ─────────────────────────────────────────────────────────────────────

const lifeCycleData = [
  { stage: "Be Born", icon: "👶", deaths: "260,000 women die annually", description: "Over 99% of maternal deaths occur in low-income countries", source: "https://www.unfpa.org/publications/trends-maternal-mortality-2000-2023", sourceName: "UNFPA" },
  { stage: "Grow", icon: "🧒", deaths: "4.8M children under 5 died in 2023", description: "13,100 children die daily from preventable diseases", source: "https://data.unicef.org/topic/child-survival/under-five-mortality", sourceName: "UNICEF" },
  { stage: "Develop", icon: "👦", deaths: "1.25M TB deaths in 2023", description: "Tuberculosis remains the deadliest infectious disease", source: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis", sourceName: "WHO" },
  { stage: "Reproduce", icon: "👨‍👩‍👧‍👦", deaths: "630,000 AIDS-related deaths in 2023", description: "1.3M new HIV infections despite 70% decline since 2004", source: "https://www.unaids.org/en/resources/fact-sheet", sourceName: "UNAIDS" },
  { stage: "Live & Age", icon: "👴", deaths: "18M premature NCD deaths under 70", description: "82% occur in low- and middle-income countries", source: "https://www.who.int/data/gho/data/themes/topics/sdg-target-3_4-noncommunicable-diseases-and-mental-health", sourceName: "WHO" }
];

const productivityData = [
  { name: "Chile", hours: 1919, wages: 38130, region: "Latin America", color: "#8b5cf6", highlight: true },
  { name: "Colombia", hours: 2252, wages: 28838, region: "Latin America", color: "#8b5cf6", highlight: true },
  { name: "Mexico", hours: 2193, wages: 20423, region: "Latin America", color: "#8b5cf6" },
  { name: "United States", hours: 1796, wages: 82933, region: "North America", color: "#3b82f6", highlight: true },
  { name: "Canada", hours: 1697, wages: 69417, region: "North America", color: "#3b82f6" },
  { name: "Korea", hours: 1865, wages: 50947, region: "Asia", color: "#0ea5e9" },
  { name: "Japan", hours: 1617, wages: 49446, region: "Asia", color: "#0ea5e9" },
  { name: "Switzerland", hours: 1532, wages: 87468, region: "Europe", color: "#10b981", highlight: true },
  { name: "Germany", hours: 1331, wages: 69433, region: "Europe", color: "#10b981" },
  { name: "France", hours: 1491, wages: 60608, region: "Europe", color: "#10b981" },
  { name: "Spain", hours: 1634, wages: 54564, region: "Europe", color: "#10b981" },
  { name: "Poland", hours: 1785, wages: 44211, region: "Europe", color: "#10b981" },
  { name: "Australia", hours: 1627, wages: 70736, region: "Oceania", color: "#f59e0b" },
  { name: "OECD Average", hours: 1736, wages: 61147, region: "Organization", color: "#6b7280", highlight: true }
];

const productivityRegions = [
  { name: "Latin America", color: "#8b5cf6" },
  { name: "North America", color: "#3b82f6" },
  { name: "Asia", color: "#0ea5e9" },
  { name: "Europe", color: "#10b981" },
  { name: "Oceania", color: "#f59e0b" },
  { name: "OECD Average", color: "#6b7280" }
];

const midHours = 1750;
const midWages = 55000;
const OECD = { hours: 1736, wages: 61147 };


// ── Expand Trigger ───────────────────────────────────────────────────────────

function ExpandTrigger({ isExpanded, caption }: { isExpanded: boolean; caption: string }) {
  return (
    <div className="relative flex flex-col items-center pt-5 cursor-pointer group">
      {/* Partial dashed border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 2"
            className="text-amber-300 group-hover:text-amber-400 transition-colors"
          />
        </svg>
      </div>

      {/* Caption */}
      <span className="text-xs text-amber-600/70 group-hover:text-amber-700 transition-colors mb-1.5 mt-2">
        {caption}
      </span>

      {/* Animated arrow */}
      <motion.div
        animate={{
          y: isExpanded ? 0 : [0, 2, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: isExpanded ? 0 : 3,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-4 h-4 text-amber-500/60 group-hover:text-amber-600 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>

        {/* Subtle pulse ring */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: 3,
              ease: "easeOut",
            }}
            style={{ margin: "-4px" }}
          />
        )}
      </motion.div>
    </div>
  );
}

// ── Charts ───────────────────────────────────────────────────────────────────

function LifeCycleTimeline() {
  return (
    <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-amber-200/40">
      <div className="mb-4 pb-3 border-b border-amber-200/40">
        <h4 className="text-sm font-semibold text-gray-900 tracking-tight">
          The Life Cycle of Preventable Death
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Global mortality at every stage of human life
        </p>
      </div>

      <div className="absolute left-[28px] sm:left-[38px] top-[88px] bottom-16 w-0.5 bg-linear-to-b from-amber-400 via-amber-300 to-amber-200" />
      <div className="space-y-0.5">
        {lifeCycleData.map((stage, index) => (
          <div key={index} className="relative flex items-center gap-3 sm:gap-4 py-3 pl-11 sm:pl-14">
            <div className="absolute left-1.5 sm:left-3 w-5 h-5 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <span className="text-xl">{stage.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-gray-900">{stage.stage}</span>
                <a
                  href={stage.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-600/80 hover:text-amber-700 underline decoration-amber-300 underline-offset-2 transition-colors"
                >
                  {stage.sourceName}
                </a>
              </div>
              <p className="text-sm text-amber-700 font-medium">{stage.deaths}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 border-t border-amber-200/40 pt-3 mt-3 text-center">
        Data from WHO, UNICEF, UNAIDS, UNFPA (2023–24)
      </p>
    </div>
  );
}

function ProductivityChart() {
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
          <ScatterChart margin={isMobile ? { top: 5, right: 10, left: 5, bottom: 25 } : { top: 10, right: 20, left: 10, bottom: 35 }}>
            <ReferenceArea x1={1300} x2={midHours} y1={midWages} y2={100000} fill="#22c55e" fillOpacity={0.08} label={{ value: "Ideal", position: "insideTopLeft", fontSize: isMobile ? 10 : 12, fill: "#15803d", fontWeight: 700 }} />
            <ReferenceArea x1={midHours} x2={2300} y1={midWages} y2={100000} fill="#eab308" fillOpacity={0.04} />
            <ReferenceArea x1={1300} x2={midHours} y1={15000} y2={midWages} fill="#6b7280" fillOpacity={0.03} />
            <ReferenceArea x1={midHours} x2={2300} y1={15000} y2={midWages} fill="#dc2626" fillOpacity={0.08} label={{ value: "Trap", position: "insideBottomRight", fontSize: isMobile ? 10 : 12, fill: "#b91c1c", fontWeight: 700 }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.7} />
            <XAxis type="number" dataKey="hours" domain={[1300, 2300]} stroke="#9ca3af" fontSize={isMobile ? 10 : 9} tickFormatter={(v) => v.toLocaleString()} tickCount={isMobile ? 4 : undefined}>
              <Label value="Hours worked per year →" position="bottom" offset={isMobile ? 6 : 12} style={{ fontSize: isMobile ? 9 : 10, fill: "#6b7280" }} />
            </XAxis>
            <YAxis type="number" dataKey="wages" domain={[15000, 100000]} stroke="#9ca3af" fontSize={isMobile ? 10 : 9} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tickCount={isMobile ? 4 : undefined}>
              <Label value="Annual wages (USD PPP) →" angle={-90} position="insideLeft" offset={0} style={{ fontSize: isMobile ? 9 : 10, fill: "#6b7280", textAnchor: "middle" }} />
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
                      {d.hours.toLocaleString()} hrs · ${d.wages.toLocaleString()} · <span className="font-semibold">${hourlyRate.toFixed(0)}/hr</span>
                    </p>
                    {!isOECD && (
                      <p className="text-gray-400 mt-1 pt-1 border-t border-gray-100">
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
            <Scatter data={isMobile ? productivityData.filter(d => d.highlight) : productivityData} fill="#8b5cf6">
              {(isMobile ? productivityData.filter(d => d.highlight) : productivityData).map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke={entry.highlight ? "#1e1b4b" : "none"} strokeWidth={entry.highlight ? 2 : 0} r={entry.highlight ? 7 : 5} />
              ))}
              <LabelList
                dataKey="name"
                position="left"
                fontSize={9}
                fill="#374151"
                formatter={(value) => {
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
          ? productivityRegions.filter(r => ["Latin America", "North America", "Europe", "OECD Average"].includes(r.name))
          : productivityRegions
        ).map((region) => (
          <div key={region.name} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
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

function EducationDivide() {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-amber-200/40">
      <div className="mb-4 pb-3 border-b border-amber-200/40">
        <h4 className="text-sm font-semibold text-gray-900 tracking-tight">
          Two Children, Same Planet
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          The education lottery at birth
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Left: Developed */}
        <div className="bg-green-50/80 rounded-lg p-3 sm:p-4 border border-green-200/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇨🇭</span>
            <span className="text-xs font-semibold text-green-800">Born in Zurich</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">School access</span>
              <span className="font-semibold text-green-700">99%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Internet at home</span>
              <span className="font-semibold text-green-700">96%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reach university</span>
              <span className="font-semibold text-green-700">77%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teacher ratio</span>
              <span className="font-semibold text-green-700">1:12</span>
            </div>
          </div>
        </div>

        {/* Right: Developing */}
        <div className="bg-red-50/80 rounded-lg p-3 sm:p-4 border border-red-200/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇹🇩</span>
            <span className="text-xs font-semibold text-red-800">Born in N&apos;Djamena</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">School access</span>
              <span className="font-semibold text-red-600">52%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Internet at home</span>
              <span className="font-semibold text-red-600">7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reach university</span>
              <span className="font-semibold text-red-600">3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teacher ratio</span>
              <span className="font-semibold text-red-600">1:58</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gap Visualization */}
      <div className="mt-4 pt-4 border-t border-amber-200/40">
        <p className="text-[10px] text-gray-500 text-center mb-3">The gap in probability of completing education</p>
        <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-green-500 rounded-l-full" style={{ width: "77%" }}>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">77%</span>
          </div>
          <div className="absolute right-0 top-0 h-full bg-red-500 rounded-r-full flex items-center justify-end" style={{ width: "23%" }}>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">3%</span>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>Switzerland</span>
          <span className="font-semibold text-gray-700">25x difference</span>
          <span>Chad</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="flex justify-center gap-6 text-center mt-4 pt-3 border-t border-amber-200/40">
        <div>
          <p className="text-base font-bold text-red-600">258M</p>
          <p className="text-[10px] text-gray-500">Out of school</p>
        </div>
        <div>
          <p className="text-base font-bold text-amber-600">617M</p>
          <p className="text-[10px] text-gray-500">Can&apos;t read basics</p>
        </div>
        <div>
          <p className="text-base font-bold text-blue-600">2/3</p>
          <p className="text-[10px] text-gray-500">Are girls</p>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 mt-3 text-center">
        <a href="https://www.unesco.org/gem-report" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">UNESCO GEM Report</a>
        {" · "}
        <a href="https://data.worldbank.org/topic/education" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">World Bank</a>
        {" (2023)"}
      </p>
    </div>
  );
}

// ── Story Section ────────────────────────────────────────────────────────────

interface StorySectionProps {
  header: React.ReactNode;
  detail: React.ReactNode;
  isExpanded: boolean;
  index: number;
  defaultOpen?: boolean;
}

function StorySection({ header, detail, isExpanded, index, defaultOpen }: StorySectionProps) {
  const showDetail = defaultOpen || isExpanded;

  return (
    <div className="space-y-3">
      {/* Header - always visible */}
      <p className="text-gray-600 leading-relaxed text-[15px]">
        {header}
      </p>

      {/* Detail - expandable */}
      <AnimatePresence initial={false}>
        {showDetail && (
          <motion.div
            initial={defaultOpen ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: defaultOpen ? 0 : index * 0.08,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              {detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

export function Story() {
  const [isExpanded, setIsExpanded] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const handleToggle = () => {
    const willExpand = !isExpanded;
    setIsExpanded(willExpand);
    if (willExpand && articleRef.current) {
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = articleRef.current!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }, 50);
    }
  };

  const sections = [
    {
      header: (
        <>
          A child born in Oslo gets vaccines as routine care. A child born in rural Colombia might
          never see a doctor. From birth to old age, <span className="text-gray-900 font-semibold">preventable
          death follows geography</span> — weak health systems, underfunded infrastructure, and a global
          lottery that decides who lives based on where they&apos;re born.
        </>
      ),
      detail: <LifeCycleTimeline />
    },
    {
      header: (
        <>
          The same lottery shapes economic opportunity. Colombian workers put in{" "}
          <span className="text-gray-900 font-semibold">2,252 hours/year</span> for $28K — Swiss workers
          do 1,532 hours for $87K. The problem isn&apos;t effort. It&apos;s that limited education,
          crumbling infrastructure, and instability <span className="text-gray-900 font-semibold">make
          each hour worth less</span>.
        </>
      ),
      detail: <ProductivityChart />
    },
    {
      header: (
        <>
          At the root sits education. During COVID, <span className="text-gray-900 font-semibold">463
          million kids had zero access</span> to remote learning. Entire villages share one internet
          connection. Brilliant minds never reach their potential because of where they were born.{" "}
          <span className="text-gray-900 font-semibold">Fix education</span>, and the other crises
          start to heal.
        </>
      ),
      detail: <EducationDivide />
    },
    {
      header: (
        <>
          These aren&apos;t separate problems — they&apos;re <span className="text-gray-900 font-semibold">one
          crisis with three faces</span>. Health, work, and education form a cycle: poor health limits
          productivity, limited income blocks education, and lack of education perpetuates poor health.
          Breaking this cycle is why I build.
        </>
      ),
      detail: (
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/asofiorg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-amber-200/60 hover:border-amber-400 hover:bg-white/80 transition-all"
          >
            <Image src={asofi} alt="" className="h-7 w-7 rounded-md object-cover" />
            <span className="text-sm font-medium text-gray-900">ASOFI</span>
          </a>
          <a
            href="https://pulpoo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-amber-200/60 hover:border-amber-400 hover:bg-white/80 transition-all"
          >
            <Image src={pulpoo} alt="" className="h-7 w-7 rounded-md object-cover" />
            <span className="text-sm font-medium text-gray-900">Pulpoo</span>
          </a>
        </div>
      )
    }
  ];

  return (
    <article ref={articleRef} className="w-full h-full rounded-2xl bg-linear-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/70 p-4 sm:p-6 md:p-8 flex flex-col border border-amber-200/50 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
        Why I Build
      </h3>

      {/* Story Sections - headers always visible, details expand */}
      <div className="space-y-5">
        {sections.map((section, index) => (
          <StorySection
            key={index}
            header={section.header}
            detail={section.detail}
            isExpanded={isExpanded}
            index={index}
            defaultOpen={index === 1}
          />
        ))}
      </div>

      {/* Expand Trigger */}
      <div
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
        className="focus:outline-none"
      >
        <ExpandTrigger
          isExpanded={isExpanded}
          caption={isExpanded ? "That's enough" : "Tell me more"}
        />
      </div>
    </article>
  );
}
