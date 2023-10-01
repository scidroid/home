import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Reading } from "contentlayer/generated";

export function ReadingCard(reading: Reading) {
  return (
    <div>
      <h2>
        <Link href={reading.url}>{reading.title}</Link>
      </h2>
      <time dateTime={reading.date}>
        {format(parseISO(reading.date), "LLLL d, yyyy")}
      </time>
    </div>
  );
}
