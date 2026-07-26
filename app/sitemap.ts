import { getReadings } from "@/content/readings";

export default async function sitemap() {
  const readingsData = (await getReadings()).map(({ slug, date }) => ({
    url: `https://almanza.cc/${slug}`,
    lastModified: date
  }));

  const routes = [""].map(route => ({
    url: `https://almanza.cc${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...readingsData];
}
