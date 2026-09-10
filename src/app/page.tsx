import Link from "next/link";

export default function Home() {
  return (
    <main className="p-12 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold">Demo Rendering Next.js 14</h1>
      <div className="flex flex-col gap-3">
        <Link href="/csr" className="p-3 bg-blue-500 text-white rounded">1. Xem trang CSR</Link>
        <Link href="/ssr" className="p-3 bg-purple-500 text-white rounded">2. Xem trang SSR</Link>
        <Link href="/ssg" className="p-3 bg-green-500 text-white rounded">3. Xem trang SSG</Link>
        <Link href="/isr" className="p-3 bg-amber-500 text-white rounded">4. Xem trang ISR</Link>
      </div>
    </main>
  );
}