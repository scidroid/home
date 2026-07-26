import { Views } from "@/components/mdx/views";
import { Link } from "@/components/ui/link";
import { SectionTitle } from "@/components/ui/section-title";
import { getReadings } from "@/content/readings";

import { formatDate } from "@/utils/dates";

export async function Readings() {
  const readings = await getReadings();

  return (
    <section className="px-4 lg:px-8 my-12">
      <div className="text-center lg:text-left mb-8">
        <SectionTitle className="mb-3">Readings</SectionTitle>
        <p className="text-base text-gray-600">
          I will be writing more thoughtful things near the end of the{" "}
          <span className="font-bold">Spring 2026</span> semester. Stay tuned!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {readings.map(metadata => (
          <Link
            href={`/${metadata.slug}`}
            key={metadata.slug}
            className="group bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 rounded-xl p-5 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-gray-800 font-heading">
                {metadata.title}
              </h3>
              <span className="shrink-0 text-sm font-medium text-gray-700 bg-gray-200/80 px-2.5 py-0.5 rounded-full">
                <Views slug={metadata.slug} />
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
              {metadata.summary}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-wide text-gray-500">
              {formatDate(metadata.date)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
