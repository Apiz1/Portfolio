"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 mb-8 font-mono text-sm">
      {LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative group transition-colors ${
              isActive ? "text-paper" : "text-slate hover:text-brass"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-brass transition-all ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
