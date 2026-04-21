export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
