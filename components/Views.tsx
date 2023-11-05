import { getViewsCount } from "@/lib/views";
import { Views } from "@/types/views";

import { ViewCounter } from "./view-counter";

export async function ViewsComponent({ slug }: { slug: string }) {
  const views = (await getViewsCount()) as Views[];

  return <ViewCounter allViews={views} slug={slug} trackView />;
}
