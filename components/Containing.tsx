import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className={`max-w-2xl lg:max-w-7xl w-full ${className}`}>{children}</div>
    </div>
  );
}
