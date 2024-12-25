import Image, { ImageProps } from "next/image";

import { Link } from "@/components/ui/link";

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base xl:text-lg text-gray-800 font-body leading-relaxed my-4">
      {children}
    </p>
  );
}

export function Bold({ children }: { children: React.ReactNode }) {
  return <span className="font-bold">{children}</span>;
}

export function Italic({ children }: { children: React.ReactNode }) {
  return <span className="italic">{children}</span>;
}

export function Heading2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl xl:text-4xl font-heading font-semibold text-gray-800 my-6">
      {children}
    </h2>
  );
}

export function Heading3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl xl:text-3xl font-heading font-semibold text-gray-800 my-5">
      {children}
    </h3>
  );
}

export function Heading4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-lg xl:text-2xl font-heading font-semibold text-gray-800 my-4">
      {children}
    </h4>
  );
}

export function Heading5({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="text-base xl:text-xl font-heading font-semibold text-gray-800 my-3">
      {children}
    </h5>
  );
}

export function Heading6({ children }: { children: React.ReactNode }) {
  return (
    <h6 className="text-sm xl:text-base font-heading font-semibold text-gray-800 my-2">
      {children}
    </h6>
  );
}

export function ImageWithCaption(props: ImageProps) {
  const { alt, ...rest } = props;
  return (
    <figure className="flex flex-col items-center justify-center my-8">
      <Image
        className="rounded-xl shadow-lg border-2 border-gray-300"
        alt={alt}
        placeholder="blur"
        {...rest}
      />
      <figcaption className="mt-2 text-gray-600 text-sm xl:text-base text-center">
        {alt}
      </figcaption>
    </figure>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-sm xl:text-base">
      {children}
    </code>
  );
}

export function InternalLink({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="text-gray-800 underline hover:no-underline transition-all duration-300"
    >
      {children}
    </Link>
  );
}

export function ExternalLink({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 underline hover:no-underline transition-all duration-300"
    >
      {children}
    </a>
  );
}
