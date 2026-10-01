import RenderInfoCard from "@/components/RenderInfoCard";
import { getBaseUrl } from "@/lib/quotes";

type Quote = {
  value: string;
  generatedAt: string;
};

async function getQuote(): Promise<Quote> {
  const res = await fetch(`${getBaseUrl()}/api/quote`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function IsrPage() {
  const quote = await getQuote();
  const generatedAt = new Date(quote.generatedAt).toLocaleString("vi-VN");

  return (
    <RenderInfoCard
      badge="ISR"
      title="Incremental Static Regeneration"
      explanation={
        "Trang tĩnh giống SSG, nhưng nhờ next: { revalidate: 60 }, Next.js sẽ " +
        "tự động build lại trang này ở NỀN mỗi khi có request đến sau khi 60 " +
        "giây trôi qua kể từ lần render trước. Vì vậy quote và thời gian bên " +
        "dưới chỉ thay đổi tối đa 1 lần mỗi 60 giây, không đổi ở mỗi lần " +
        "reload như SSR."
      }
      code={`fetch("/api/quote", {\n  next: { revalidate: 60 },\n});`}
      quote={quote.value}
      generatedAt={generatedAt}
    />
  );
}
