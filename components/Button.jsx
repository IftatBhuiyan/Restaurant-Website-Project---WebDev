import Link from "next/link";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark border border-brand",
  secondary: "bg-surface text-brand border border-brand hover:bg-brand/5",
  accent: "bg-accent text-charcoal border border-accent hover:brightness-95",
  ghost: "bg-transparent text-white border border-white/40 hover:bg-white/10",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
