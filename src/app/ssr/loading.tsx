/**
 * Suspense fallback cho /ssr.
 * Hiện ra trong lúc server đang await fetch `cache: "no-store"` từ dummyjson.
 * Chỉ animate `opacity` — không đụng layout property, an toàn GPU.
 */
export default function SSRLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="h-6 w-72 animate-breathe rounded bg-gray-200" />
        <div className="h-4 w-20 animate-breathe rounded bg-gray-200" />
      </div>

      {/* Vỏ badge chẩn đoán */}
      <div className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-breathe rounded bg-gray-200" />
            <div className="h-5 w-32 animate-breathe rounded-full bg-gray-100" />
          </div>
          <div className="h-7 w-36 animate-breathe rounded border border-gray-200 bg-gray-50" />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <div className="h-3.5 w-44 animate-breathe rounded bg-gray-100" />
          <div className="h-3.5 w-32 animate-breathe rounded bg-gray-100" />
        </div>
        <div className="h-8 w-full animate-breathe rounded bg-gray-100" />
      </div>

      <div className="space-y-2">
        <div className="h-3.5 w-48 animate-breathe rounded bg-gray-100" />
        {/* Vỏ quote card */}
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="h-4 w-20 animate-breathe rounded-full bg-gray-100" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full animate-breathe rounded bg-gray-100" />
            <div className="h-4 w-4/5 animate-breathe rounded bg-gray-100" />
          </div>
          <div className="mt-3 ml-auto h-3.5 w-28 animate-breathe rounded bg-gray-100" />
        </div>
      </div>

      <p className="font-mono text-xs text-gray-400">
        Server đang fetch quote mới…
      </p>
    </div>
  );
}
