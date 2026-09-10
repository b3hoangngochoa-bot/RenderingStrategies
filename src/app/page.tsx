"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Gọi API từ phía trình duyệt (Client)
    fetch('https://jsonplaceholder.typicode.com/posts/2')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  // Hiển thị trạng thái loading trong lúc chờ dữ liệu
  if (!data) {
    return (
      <main className="min-h-screen p-10 flex justify-center items-center">
        <p className="text-xl font-bold animate-pulse">Đang tải dữ liệu từ Client...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 bg-green-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          🎨 Bài tập: Client-Side Rendering (CSR)
        </h1>
        <p className="mb-4 text-gray-600">
          Trang web này dùng <code className="bg-green-200 px-1 rounded text-green-800">"use client"</code> và React Hooks để fetch data trực tiếp từ trình duyệt của bạn.
        </p>
        <div className="p-6 border border-green-300 rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3 capitalize text-gray-800">{data.title}</h2>
          <p className="text-gray-700 leading-relaxed">{data.body}</p>
        </div>
      </div>
    </main>
  );
}