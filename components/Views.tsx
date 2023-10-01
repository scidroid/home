import { getViewsCount } from "@/lib/views";
import { ViewCounter } from "./view-counter";
import { Views } from "@/types/views";

export async function ViewsComponent({ slug }: { slug: string }) {
  const views = (await getViewsCount()) as Views[];

  return <ViewCounter allViews={views} slug={slug} trackView />;
}
