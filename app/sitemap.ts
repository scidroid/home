import { readings } from "@/content/readings";

export default async function sitemap() {
  const readingsData = readings.map(reading => ({
    url: `https://almanza.cc/${reading.metadata.slug}`,
    lastModified: reading.metadata.date
  }));

  const routes = [""].map(route => ({
    url: `https://almanza.cc${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...readingsData];
}
