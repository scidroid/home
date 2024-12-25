import { readings } from "@/content/readings";

export default async function sitemap() {
  const readingsData = readings.map(reading => ({
    url: `https://testing.scidroid.co/${reading.metadata.slug}`,
    lastModified: reading.metadata.date
  }));

  const routes = [""].map(route => ({
    url: `https://testing.scidroid.co${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...readingsData];
}
