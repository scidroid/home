import Link from "next/link";

import { allReadings } from "@/.contentlayer/generated";
import { formatDate } from "@/utils/dates";

import { Card } from "./Card";
import { Views } from "./Views";

export function Readings() {
  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-2xl uppercase my-2">Readings</h2>
      <div className="grid grid-cols-2 gap-4 my-4">
        {allReadings.map((reading, key) => (
          <Link href={`/${reading.slug}`} key={key}>
            <Card hover>
              <div className="flex items-center justify-between my-2">
                <h3 className="font-bold text-2xl">{reading.title}</h3>
                <p className="font-semibold text-xl">
                  <Views slug={reading.slug} />
                </p>
              </div>
              <p className="text-justify text-lg">
                <span className="font-semibold">
                  {formatDate(reading.date)}
                </span>
                {` - ${reading.summary}`}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
