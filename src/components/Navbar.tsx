import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 hover:text-black">
          Demo Rendering
        </Link>
        <div className="flex gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            Trang chủ
          </Link>
          <Link href="/ssr" className="hover:text-black">
            SSR
          </Link>
          <Link href="/isr" className="hover:text-black">
            ISR
          </Link>
        </div>
      </div>
    </nav>
  );
}
