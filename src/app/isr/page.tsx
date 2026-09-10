import { getCuratedQuotesISR, ISR_FETCH_CODE, REVALIDATE_SECONDS } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";
import RenderInfo from "@/components/RenderInfo";
import Link from "next/link";

// Route segment config phải là literal để Next.js static-analysis được.
// Giữ giá trị này khớp với REVALIDATE_SECONDS trong lib/quotes.ts.
export const revalidate = 20;

export default async function ISRPage() {
  const { quotes, timestamp } = await getCuratedQuotesISR();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">ISR Demo (Revalidate: {REVALIDATE_SECONDS}s)</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-black">
          ← Quay lại
        </Link>
      </div>

      <RenderInfo
        strategy="ISR"
        renderTime={timestamp}
        revalidate={REVALIDATE_SECONDS}
        code={ISR_FETCH_CODE}
      />

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase">
          Danh sách quotes (Cache {REVALIDATE_SECONDS}s):
        </h2>
        {quotes.map((q) => (
          <QuoteCard key={q.id} quote={q} />
        ))}
      </div>
    </div>
  );
}
