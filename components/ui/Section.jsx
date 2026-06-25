export default function Section({ children, className = "", fullWidth = false }) {
  return (
    <section
      className={`px-4 py-8 sm:px-6 md:py-12 lg:px-8 ${fullWidth ? "" : "mx-auto max-w-6xl"} ${className}`}
    >
      {children}
    </section>
  );
}
