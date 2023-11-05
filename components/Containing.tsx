import { ReactNode } from "react";

export function Container({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className={`w-full max-w-2xl lg:max-w-7xl ${className}`}>
        {children}
      </div>
    </div>
  );
}
