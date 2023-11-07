import Link from "next/link";

import { allReadings } from "@/.contentlayer/generated";
import { formatDate } from "@/utils/dates";

import { Views } from "./Views";

export function Readings() {
  return (
    <section id="contact" className="m-4 flex flex-col items-center">
      <h2 className="my-4 text-4xl font-semibold lg:my-4 lg:text-5xl">
        Readings
      </h2>
      {allReadings.map((reading, key) => (
        <Link href={`/${reading.slug}`} key={key}>
          <article className="max-w-3xl">
            <div className="flex items-center justify-between my-2">
              <h3 className="font-bold text-3xl">{reading.title}</h3>
              <p className="font-semibold text-2xl">
                <Views slug={reading.slug} />
              </p>
            </div>
            <p className="text-justify text-lg">
              <span className="font-semibold">{formatDate(reading.date)}</span>
              {` - ${reading.summary}`}
            </p>
          </article>
        </Link>
      ))}
    </section>
  );
}
