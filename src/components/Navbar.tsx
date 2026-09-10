import Link from "next/link";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/csr", label: "CSR" },
  { href: "/ssr", label: "SSR" },
  { href: "/ssg", label: "SSG" },
  { href: "/isr", label: "ISR" },
];

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/[.08] dark:border-white/[.145]">
      <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-2 px-6 py-4">
        <span className="font-semibold mr-4">Demo 4 Kiểu Rendering</span>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-1.5 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
