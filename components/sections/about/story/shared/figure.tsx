export function Figure({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-200/40 bg-white/50 p-5 backdrop-blur-sm">
      {children}
    </div>
  );
}

export function FigureTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-gray-900">
      {children}
    </h3>
  );
}
