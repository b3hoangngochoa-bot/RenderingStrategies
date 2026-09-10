import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts: Post[] = [
  { id: 1, title: "Tìm hiểu về Tailwind CSS", body: "Tailwind CSS là gì? Ưu và nhược điểm của Tailwind CSS" },
  { id: 2, title: "Python cho người mới bắt đầu", body: "Tìm hiểu về Python" },
  { id: 3, title: "Vì sao nên dùng TypeScript cho dự án React?", body: "TypeScript giúp bắt lỗi sớm và code dễ bảo trì hơn khi dự án phát triển lớn dần." },
  { id: 4, title: "Tailwind CSS giúp viết giao diện nhanh hơn thế nào?", body: "Tìm hiểu cách dùng utility class để style component mà không cần viết file CSS riêng." },
  { id: 5, title: "App Router và Pages Router: nên chọn cái nào?", body: "So sánh ưu nhược điểm giữa hai cách tổ chức route trong Next.js." },
  { id: 6, title: "5 lỗi thường gặp khi mới học Next.js", body: "Điểm qua các lỗi phổ biến của người mới và cách khắc phục nhanh gọn." },
];

async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return posts;
}

export default async function HomePage() {
  const data = await getPosts();
  const time = new Date().toLocaleTimeString("vi-VN");

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-black/[.08] dark:border-white/[.145] pb-4 flex items-center justify-between">
        <span className="font-semibold text-base">Rendering Demo</span>
        <nav className="flex gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 rounded text-sm font-medium transition bg-black text-white dark:bg-white dark:text-black"
          >
            Trang 1 (SSR)
          </Link>
          <Link
            href="/users"
            className="px-3 py-1.5 rounded text-sm font-medium transition border border-black/[.08] dark:border-white/[.145]"
          >
            Trang 2 (CSR)
          </Link>
        </nav>
      </header>

      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-black/[.05] dark:bg-white/[.06]">
            SSR (Server-Side Rendering)
          </span>
          <h1 className="text-xl font-bold mt-2">Danh sách bài viết</h1>
          <p className="text-xs text-neutral-500 mt-1">Rendered at: {time}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-black/[.08] dark:border-white/[.145]"
            >
              <h2 className="font-semibold text-base mb-1">
                {post.id}. {post.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}