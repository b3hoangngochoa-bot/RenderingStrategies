import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demo Rendering Next.js 14</h1>
        <p className="text-gray-600 text-sm mt-1">
          Chủ đề Quotes — Chọn 1 trong 2 kiểu bên dưới để xem demo:
        </p>
      </div>

      <div className="grid gap-4">
        <Link
          href="/ssr"
          className="block border border-gray-200 rounded-md p-4 bg-white hover:border-black transition-colors"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">1. SSR (Server-Side Rendering)</h2>
            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
              cache: &apos;no-store&apos;
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Mỗi lần request, server gọi API lấy quote mới và render HTML. F5 là đổi ngay lập tức.
          </p>
        </Link>

        <Link
          href="/isr"
          className="block border border-gray-200 rounded-md p-4 bg-white hover:border-black transition-colors"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">2. ISR (Incremental Static Regeneration)</h2>
            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
              revalidate: 20s
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Cache trang tĩnh, tự làm mới ngầm sau 20 giây. F5 trong 20s giữ nguyên dữ liệu.
          </p>
        </Link>
      </div>
    </div>
  );
}
