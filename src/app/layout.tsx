import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Demo Rendering Next.js',
  description: 'Thực hành CSR, SSR, SSG, ISR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {/* Thanh Menu điều hướng */}
        <nav className="bg-slate-800 p-4 shadow-md">
          <div className="max-w-3xl mx-auto flex gap-6 justify-center font-semibold">
            <Link href="/" className="hover:text-blue-400"> Trang chủ</Link>
            <Link href="/csr" className="hover:text-amber-400">CSR</Link>
            <Link href="/ssr" className="hover:text-emerald-400">SSR</Link>
            <Link href="/ssg" className="hover:text-purple-400">SSG</Link>
            <Link href="/isr" className="hover:text-rose-400">ISR</Link>
          </div>
        </nav>

        {/* Phần nội dung của từng trang sẽ hiển thị ở đây */}
        <main className="max-w-3xl mx-auto p-6 mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}