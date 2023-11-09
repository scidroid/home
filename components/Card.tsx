import { ReactNode } from "react";

export function Card({
  children,
  hover,
  className
}: {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-white rounded-md border-2 px-8 py-6 ${
        hover ? "shadow-inner hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
