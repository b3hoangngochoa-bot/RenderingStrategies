import Link from "next/link";

const cards = [
  {
    href: "/csr",
    title: "CSR — Client-Side Rendering",
    desc: "Render trên trình duyệt bằng \"use client\" + useEffect. Dữ liệu chỉ xuất hiện sau khi JS chạy xong ở client.",
  },
  {
    href: "/ssr",
    title: "SSR — Server-Side Rendering",
    desc: "Render trên server ở MỖI request, dùng fetch(..., { cache: \"no-store\" }). Reload trang sẽ luôn ra dữ liệu mới.",
  },
  {
    href: "/ssg",
    title: "SSG — Static Site Generation",
    desc: "Render 1 lần lúc build, dùng fetch(..., { cache: \"force-cache\" }). Dữ liệu không đổi dù reload bao nhiêu lần.",
  },
  {
    href: "/isr",
    title: "ISR — Incremental Static Regeneration",
    desc: "Tĩnh nhưng tự làm mới theo chu kỳ, dùng fetch(..., { next: { revalidate: 60 } }). Dữ liệu chỉ đổi sau mỗi 60 giây.",
  },
];

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">
        Next.js 14 – Demo 4 Kiểu Rendering
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-10">
        Mỗi trang bên dưới lấy một câu tục ngữ / danh ngôn tiếng Việt ngẫu
        nhiên từ API nội bộ (route.ts trong chính project) và hiển thị thời
        điểm dữ liệu được tạo ra, để bạn thấy rõ sự khác nhau giữa 4 kiểu
        rendering.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-xl border border-black/[.08] dark:border-white/[.145] p-5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <h2 className="font-semibold mb-1">{card.title}</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
