import { Views } from "@/components/content/views";
import { Link } from "@/components/ui/link";
import { readings } from "@/content/readings";

import { formatDate } from "@/utils/dates";

export function Readings() {
  return (
    <section className="w-[95%] mx-auto my-4">
      <h2 className="text-4xl xl:text-6xl font-extrabold bg-gradient-to-t from-gray-600 to-gray-800 bg-clip-text text-transparent font-heading xl:leading-tight leading-tight my-4 text-center xl:text-left">
        Readings
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-4">
        {readings.map(({ metadata }, key) => (
          <Link
            href={`/${metadata.slug}`}
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl px-8 py-4 transition-colors font-medium shadow-lg"
            key={key}
          >
            <div className="flex flex-wrap items-center justify-between my-2">
              <h3 className="font-bold text-xl xl:text-2xl font-heading">
                {metadata.title}
              </h3>
              <p className="font-semibold text-lg">
                <Views slug={metadata.slug} />
              </p>
            </div>
            <p className="text-justify text-lg">
              <span className="font-semibold">{formatDate(metadata.date)}</span>
              {` - ${metadata.summary}`}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
