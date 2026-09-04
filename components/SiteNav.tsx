import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="flex items-center gap-6 mb-8 font-mono text-sm">
      <Link 
        href="/" 
        className="text-paper hover:text-brass transition-colors relative group"
      >
        Home
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brass transition-all group-hover:w-full" />
      </Link>
      <Link 
        href="/about" 
        className="text-slate hover:text-brass transition-colors relative group"
      >
        About
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brass transition-all group-hover:w-full" />
      </Link>
    </nav>
  );
}
