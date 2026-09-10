'use client';

import { useState, useEffect } from 'react';

export default function CSRPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trình duyệt tự gọi API sau khi trang đã hiển thị khung
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-slate-800 rounded-xl border-l-4 border-amber-400">
      <h1 className="text-2xl font-bold text-amber-400 mb-2">Client-Side Rendering (CSR)</h1>
      <p className="mb-4 text-slate-300">Dữ liệu được lấy trực tiếp bởi Trình duyệt của bạn.</p>

      {loading ? (
        <div className="animate-pulse text-amber-200">⏳ Trình duyệt đang tải nội dung...</div>
      ) : (
        <div className="bg-slate-700 p-4 rounded text-amber-100">
          ✅ Trình duyệt đã tải và hiển thị nội dung thành công!
        </div>
      )}
    </div>
  );
}