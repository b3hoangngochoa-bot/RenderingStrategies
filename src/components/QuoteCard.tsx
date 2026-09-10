import { Quote } from "@/types/quote";

export default function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-600">
        {quote.category}
      </span>
      <p className="mt-2.5 text-base text-gray-900">&ldquo;{quote.quote}&rdquo;</p>
      <p className="mt-2 text-right text-sm text-gray-500">— {quote.author}</p>
    </div>
  );
}
