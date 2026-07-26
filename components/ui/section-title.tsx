export function SectionTitle({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-heading leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}
