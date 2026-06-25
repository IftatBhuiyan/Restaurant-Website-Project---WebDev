export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-5 shadow-sm md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
