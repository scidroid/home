"use client";

import { useState } from "react";
import { CodeBlock as CodeBlockPrimitive } from "react-code-block";

import { themes } from "prism-react-renderer";

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
      <CodeBlockPrimitive
        code={children}
        language={language}
        theme={themes.github}
      >
        <CodeBlockPrimitive.Code className="bg-white p-4 rounded-b-xl shadow-xl overflow-x-auto font-mono text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <CodeBlockPrimitive.LineNumber className="text-xs text-gray-400 text-right select-none w-[30px]" />
            <CodeBlockPrimitive.LineContent>
              <CodeBlockPrimitive.Token />
            </CodeBlockPrimitive.LineContent>
          </div>
        </CodeBlockPrimitive.Code>
      </CodeBlockPrimitive>
    </div>
  );
}
