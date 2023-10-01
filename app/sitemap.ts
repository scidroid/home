import { allReadings } from "contentlayer/generated";

export default async function sitemap() {
  const readings = allReadings.map((reading) => ({
    url: `https://scidroid.co/${reading._raw.flattenedPath}`,
    lastModified: reading.date,
  }));

  const routes = [""].map((route) => ({
    url: `https://scidroid.co${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...readings];
}
