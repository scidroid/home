import { REFERENCES, referenceById } from "@/data/references";
import type { Reference } from "@/data/references";

// The APA string itself, reused by every place a source is named.
export function Apa({ reference }: { reference: Reference }) {
  return (
    <>
      {reference.author} ({reference.year}).{" "}
      <em className="italic">{reference.title}</em>
      {reference.note ? ` [${reference.note}]` : ""}.
    </>
  );
}

const host = (href: string) => new URL(href).host.replace(/^www\./, "");

const TRIGGER =
  "group/cite relative underline decoration-dotted underline-offset-2 hover:text-gray-600 hover:decoration-solid";

const CARD =
  "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-max -translate-x-1/2 whitespace-normal rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-left font-sans text-[11px] leading-snug text-gray-700 no-underline opacity-0 shadow-lg ring-1 ring-gray-900/5 motion-safe:transition-opacity group-hover/cite:opacity-100 group-focus-visible/cite:opacity-100 sm:block";

const CARET =
  "absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-gray-200 bg-white";

function Card({
  width,
  children
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <span role="tooltip" className={`${CARD} ${width}`}>
      {children}
      <span className={CARET} />
    </span>
  );
}

export function Citation({
  reference,
  label
}: {
  reference: Reference;
  label?: string;
}) {
  return (
    <a
      href={reference.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${TRIGGER} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400`}
    >
      {label ?? reference.short ?? reference.author}
      <Card width="max-w-[15rem]">
        <span className="block">
          <Apa reference={reference} />
        </span>
        <span className="mt-1.5 block font-mono text-[9px] text-gray-400">
          {host(reference.href)} ↗
        </span>
      </Card>
    </a>
  );
}

export function SourceLine({
  ids,
  className = ""
}: {
  ids: string[];
  className?: string;
}) {
  return (
    <p
      className={`text-balance font-mono text-[9px] leading-relaxed text-gray-400 ${className}`}
    >
      Sources:{" "}
      {ids.map((id, i) => (
        <span key={id} className="whitespace-nowrap">
          {i > 0 && " · "}
          <Citation reference={referenceById(id)} />
        </span>
      ))}
    </p>
  );
}

// An APA list of sources: the whole bibliography, or just the ids given.
export function ReferenceList({
  ids,
  className = "",
  itemClassName = "text-[12px] leading-relaxed text-gray-500"
}: {
  ids?: string[];
  className?: string;
  itemClassName?: string;
}) {
  const items = ids ? ids.map(referenceById) : REFERENCES;
  return (
    <ol className={className}>
      {items.map(reference => (
        <li key={reference.id} className={itemClassName}>
          <a
            href={reference.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted decoration-gray-300 underline-offset-2 hover:text-gray-700 hover:decoration-gray-500"
          >
            <Apa reference={reference} />
          </a>
        </li>
      ))}
    </ol>
  );
}
