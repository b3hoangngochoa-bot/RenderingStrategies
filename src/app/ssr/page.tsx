import { getRealtimeQuoteSSR, SSR_FETCH_CODE } from "@/lib/quotes";
import QuoteCard from "@/components/QuoteCard";
import RenderInfo from "@/components/RenderInfo";
import Link from "next/link";

// Không cần `export const dynamic = "force-dynamic"`:
// riêng `cache: "no-store"` trong fetch đã buộc route này render động mỗi request.

export default async function SSRPage() {
  const { quote, timestamp } = await getRealtimeQuoteSSR();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">SSR Demo (Server-Side Rendering)</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-black">
          ← Quay lại
        </Link>
      </div>

      <RenderInfo strategy="SSR" renderTime={timestamp} code={SSR_FETCH_CODE} />

      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase">
          Quote render từ server:
        </h2>
        <QuoteCard quote={quote} />
      </div>
    </div>
  );
}
