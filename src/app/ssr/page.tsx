import RenderInfoCard from "@/components/RenderInfoCard";
import { getBaseUrl } from "@/lib/quotes";

type Quote = {
  value: string;
  generatedAt: string;
};

async function getQuote(): Promise<Quote> {
  const res = await fetch(`${getBaseUrl()}/api/quote`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function SsrPage() {
  const quote = await getQuote();
  const generatedAt = new Date(quote.generatedAt).toLocaleString("vi-VN");

  return (
    <RenderInfoCard
      badge="SSR"
      title="Server-Side Rendering"
      explanation={
        'Trang được render trên SERVER ở mỗi request nhờ cache: "no-store". ' +
        "Mỗi lần bạn reload trang (F5), server sẽ gọi API lại và trả về câu " +
        "quote cùng thời gian tạo hoàn toàn mới. Hãy thử reload để kiểm chứng."
      }
      code={`fetch("/api/quote", {\n  cache: "no-store",\n});`}
      quote={quote.value}
      generatedAt={generatedAt}
    />
  );
}
