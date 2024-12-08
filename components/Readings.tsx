import Link from "next/link";

import { readings } from "@/content/readings";
import { formatDate } from "@/utils/dates";

import { Views } from "./views";

export function Readings() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-2xl uppercase my-2 font-heading text-center xl:text-left">
        Readings
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-4 max-w-xl xl:max-w-none">
        {readings.map(({ metadata }, key) => (
          <Link
            href={`/${metadata.slug}`}
            className="rounded-xl border-2 border-gray-300 w-full px-8 py-4 bg-gradient-to-bl from-gray-100 via-gray-100 to-gray-100 duration-300 transition-all hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-200 hover:to-gray-100 hover:text-gray-800"
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
