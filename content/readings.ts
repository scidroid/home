import { readdir } from "fs/promises";
import path from "path";

export type Reading = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

const DIR = path.join(process.cwd(), "content", "readings");

// Readings are whatever .mdx files sit in the folder, newest first. Adding one
// is dropping a file in; nothing here has to be told about it.
export async function getReadings(): Promise<Reading[]> {
  const files = await readdir(DIR);
  const readings = await Promise.all(
    files
      .filter(file => file.endsWith(".mdx"))
      .map(async file => {
        const { metadata } = await import(`@/content/readings/${file}`);
        return metadata as Reading;
      })
  );
  return readings.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getReading(slug: string) {
  const readings = await getReadings();
  return readings.find(reading => reading.slug === slug);
}
