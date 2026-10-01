"use client";

import { useEffect, useState } from "react";
import RenderInfoCard from "@/components/RenderInfoCard";

type Quote = {
  value: string;
  generatedAt: string;
};

export default function CsrPage() {
  const [quote, setQuote] = useState<string>();
  const [generatedAt, setGeneratedAt] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchQuote = () => {
    setLoading(true);
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data: Quote) => {
        setQuote(data.value);
        setGeneratedAt(new Date(data.generatedAt).toLocaleString("vi-VN"));
        setLoading(false);
      })
      .catch(() => {
        setQuote("Không tải được dữ liệu.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <RenderInfoCard
      badge="CSR"
      title="Client-Side Rendering"
      explanation={
        'Component có "use client" ở đầu file. Dữ liệu được fetch bên trong ' +
        "useEffect, chạy ở TRÌNH DUYỆT sau khi trang đã load xong (bạn có thể " +
        'thấy chữ "Đang tải dữ liệu..." xuất hiện trước). Bấm "Tải lại" để fetch câu mới ngay trên client, không cần reload trang.'
      }
      code={`"use client";\n\nuseEffect(() => {\n  fetch("/api/quote")\n    .then(res => res.json())\n    .then(data => setQuote(data.value));\n}, []);`}
      quote={quote}
      generatedAt={generatedAt}
      loading={loading}
      onRefresh={fetchQuote}
    />
  );
}
