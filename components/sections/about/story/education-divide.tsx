"use client";

export function EducationDivide() {
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
            <span className="text-xs font-semibold text-green-800">
              Born in Zurich
            </span>
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
            <span className="text-xs font-semibold text-red-800">
              Born in N&apos;Djamena
            </span>
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
        <p className="text-[10px] text-gray-500 text-center mb-3">
          The gap in probability of completing education
        </p>
        <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-green-500 rounded-l-full"
            style={{ width: "77%" }}
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
              77%
            </span>
          </div>
          <div
            className="absolute right-0 top-0 h-full bg-red-500 rounded-r-full flex items-center justify-end"
            style={{ width: "23%" }}
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
              3%
            </span>
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
        <a
          href="https://www.unesco.org/gem-report"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          UNESCO GEM Report
        </a>
        {" · "}
        <a
          href="https://data.worldbank.org/topic/education"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          World Bank
        </a>
        {" (2023)"}
      </p>
    </div>
  );
}
