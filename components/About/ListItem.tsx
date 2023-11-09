export function ListItem({
  title,
  description,
  link
}: {
  title: string;
  description: string;
  link?: {
    content: string;
    url: string;
  };
}) {
  return (
    <li className="my-4">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-lg">
        {description}{" "}
        {link && (
          <a
            href={link.url}
            about="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {link.content}
          </a>
        )}
      </p>
    </li>
  );
}
