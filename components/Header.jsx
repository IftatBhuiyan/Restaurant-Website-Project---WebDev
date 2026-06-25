"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

function isActive(pathname, href) {
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          The Corner Grill
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 px-3 text-xl md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-1 border-t border-white/10 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:border-0 md:pt-0`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:min-h-0 md:py-1 ${
                isActive(pathname, link.href)
                  ? "text-accent"
                  : "text-white/90 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/menu/" variant="accent" className="mt-1 w-full md:mt-0 md:w-auto">
            Order Online
          </Button>
        </nav>
      </div>
    </header>
  );
}
