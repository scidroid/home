// Opens a new tab only for absolute urls, so callers never handle rel themselves.
export function TextLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="text-gray-900 font-medium underline hover:no-underline"
    >
      {children}
    </a>
  );
}
