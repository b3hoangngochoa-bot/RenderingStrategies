import RenderInfoCard from "@/components/RenderInfoCard";
import { getBaseUrl } from "@/lib/quotes";

type Quote = {
  value: string;
  generatedAt: string;
};

async function getQuote(): Promise<Quote> {
  const res = await fetch(`${getBaseUrl()}/api/quote`, {
    cache: "force-cache",
  });
  return res.json();
}

export default async function SsgPage() {
  const quote = await getQuote();
  const generatedAt = new Date(quote.generatedAt).toLocaleString("vi-VN");

  return (
    <RenderInfoCard
      badge="SSG"
      title="Static Site Generation"
      explanation={
        'Trang được render đúng 1 LẦN lúc "npm run build" nhờ ' +
        'cache: "force-cache" (mặc định của fetch trong Next.js). Sau khi build, ' +
        "kết quả HTML tĩnh này được tái sử dụng cho mọi request — dù bạn reload " +
        "bao nhiêu lần, câu quote và thời gian bên dưới vẫn giữ nguyên cho đến " +
        "lần build tiếp theo."
      }
      code={`fetch("/api/quote", {\n  cache: "force-cache",\n});`}
      quote={quote.value}
      generatedAt={generatedAt}
    />
  );
}
