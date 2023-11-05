import { cache } from "react";

import { kv } from "@vercel/kv";
import { allReadings } from "contentlayer/generated";

export const getViewsCount = cache(
  async () =>
    await Promise.all(
      allReadings.map(async reading => {
        return {
          slug: reading.slug,
          count: await kv.get(reading.slug)
        };
      })
    )
);
