"use client";

import { useState } from "react";

import { themes } from "prism-react-renderer";
import { CodeBlock as CodeBlockPrimitive } from "react-code-block";

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
    <div className="relative w-full max-w-full overflow-x-auto">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-xl">
        <span className="text-sm text-gray-600 font-mono truncate">
          {`${filename ? `${filename} • ` : ""}${language}`}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <CodeBlockPrimitive
        code={children}
        language={language}
        theme={themes.github}
      >
        <CodeBlockPrimitive.Code className="bg-gray-50 p-4 rounded-b-xl shadow-lg overflow-x-auto">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <CodeBlockPrimitive.LineNumber className="text-sm text-gray-500 text-right select-none w-[30px]" />
            <CodeBlockPrimitive.LineContent>
              <CodeBlockPrimitive.Token />
            </CodeBlockPrimitive.LineContent>
          </div>
        </CodeBlockPrimitive.Code>
      </CodeBlockPrimitive>
    </div>
  );
}
