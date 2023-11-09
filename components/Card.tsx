import { ReactNode } from "react";

export function Card({
  children,
  hover,
  className,
  bg = "white"
}: {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={`w-full bg-${bg} rounded-md border-2 px-8 py-6 ${
        hover ? "shadow-inner hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
