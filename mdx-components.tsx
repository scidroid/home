import Image from "next/image";

import { CodeBlock } from "@/components/mdx/code-block";
import type { MDXComponents } from "mdx/types";

// The one place that says how written prose looks. Markdown maps onto these, so
// a reading never imports a component to write a sentence: ## is a heading, **
// is bold, [text](url) is a link, and a fenced block is the code viewer.

// A fenced block arrives as <pre><code className="language-x">. Everything the
// code viewer needs rides in that one token, so a fence reads
// ```cpp:fenwick.cpp and needs no plugin to carry the file name.
function Pre({ children }: { children?: React.ReactNode }) {
  const code = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;
  const { className = "", children: source = "" } = code?.props ?? {};
  const [language = "text", filename] = className
    .replace("language-", "")
    .split(":");

  return (
    <CodeBlock language={language} filename={filename}>
      {String(source)}
    </CodeBlock>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    p: ({ children }) => (
      <p className="text-base xl:text-lg text-gray-700 font-body leading-relaxed my-4 text-pretty">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl xl:text-4xl font-heading font-bold text-gray-800 my-8">
        {children}
      </h2>
    ),

    strong: ({ children }) => <span className="font-bold">{children}</span>,

    em: ({ children }) => <span className="italic">{children}</span>,

    a: ({ href = "", children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 underline hover:no-underline transition-all duration-300"
      >
        {children}
      </a>
    ),

    // Only inline code reaches this: a fenced block is intercepted by Pre.
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-sm xl:text-base">
        {children}
      </code>
    ),

    pre: Pre,

    // The alt text doubles as the caption, so it is written once.
    img: props => (
      <figure className="flex flex-col items-center justify-center my-10">
        <Image
          {...(props as React.ComponentProps<typeof Image>)}
          className="rounded-xl shadow-2xl"
          alt={props.alt ?? ""}
        />
        <figcaption className="mt-3 text-gray-600 text-sm xl:text-base text-center italic">
          {props.alt}
        </figcaption>
      </figure>
    )
  };
}
