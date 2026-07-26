declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  // Every reading declares this at the top of its own file, so a post carries
  // its own front matter instead of being registered somewhere else.
  export const metadata: {
    slug: string;
    title: string;
    date: string;
    summary: string;
  };

  export default function MDXContent(props: MDXProps): React.ReactElement;
}
