"use client";

import { useState } from "react";

import { Highlight, themes } from "prism-react-renderer";

export function CodeBlock({
  children,
  language,
  filename
}: {
  children: string;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative w-[95vw] md:w-full overflow-x-auto my-8">
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 rounded-t-xl">
        <span className="text-sm text-gray-700 font-mono truncate font-medium">
          {`${filename ? `${filename} • ` : ""}${language}`}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-sm text-gray-600 hover:text-gray-800 transition-all duration-200 bg-white px-3 py-1 rounded-md hover:shadow-sm"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <Highlight
        code={children.trim()}
        language={language}
        theme={themes.github}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="bg-white p-4 rounded-b-xl shadow-xl overflow-x-auto font-mono text-sm"
            style={{ ...style, backgroundColor: "white" }}
          >
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              {tokens.map((line, i) => (
                <div key={i} className="contents">
                  <span className="text-xs text-gray-400 text-right select-none w-[30px] leading-5">
                    {i + 1}
                  </span>
                  <span {...getLineProps({ line })} className="leading-5">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
