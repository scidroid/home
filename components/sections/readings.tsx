import { Views } from "@/components/content/views";
import { Link } from "@/components/ui/link";
import { readings } from "@/content/readings";

import { formatDate } from "@/utils/dates";

export function Readings() {
  return (
    <section className="w-[95%] mx-auto my-4">
      <h2 className="text-4xl xl:text-6xl font-bold text-gray-800 font-heading xl:leading-tight leading-tight my-8 text-center xl:text-left">
        Readings
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-4">
        {readings.map(({ metadata }, key) => (
          <Link
            href={`/${metadata.slug}`}
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md group"
            key={key}
          >
            <h3 className="font-semibold text-xl xl:text-2xl font-heading text-gray-800 mb-2">
              {metadata.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {metadata.summary}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{formatDate(metadata.date)}</span>
              <div className="text-base font-semibold text-gray-700">
                <Views slug={metadata.slug} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
