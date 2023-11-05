import Link from "next/link";

const LINK_STYLE =
  "group first-letter:transition-all duration-300 ease-in-out text-2xl font-semibold";
const HOVER_UNDERLINE_STYLE =
  "pb-1 bg-left-bottom bg-gradient-to-r from-neutral-700 to-neutral-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out";

interface StyledLinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

export function StyledLink({
  href,
  external = false,
  children
}: StyledLinkProps) {
  const content = <span className={HOVER_UNDERLINE_STYLE}>{children}</span>;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_STYLE}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={LINK_STYLE}>
      {content}
    </Link>
  );
}
