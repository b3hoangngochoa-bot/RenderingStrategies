type RenderInfoCardProps = {
  badge: string;
  title: string;
  explanation: string;
  code: string;
  quote?: string;
  generatedAt?: string;
  loading?: boolean;
  onRefresh?: () => void;
};

export default function RenderInfoCard({
  badge,
  title,
  explanation,
  code,
  quote,
  generatedAt,
  loading,
  onRefresh,
}: RenderInfoCardProps) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <span className="inline-block text-xs font-semibold uppercase tracking-wide bg-foreground text-background rounded-full px-3 py-1 mb-4">
        {badge}
      </span>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        {explanation}
      </p>

      <pre className="text-xs bg-black/[.05] dark:bg-white/[.06] rounded-lg p-4 overflow-x-auto mb-8 font-[family-name:var(--font-geist-mono)]">
        {code}
      </pre>

      <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] p-6">
        {loading ? (
          <p className="text-sm text-black/60 dark:text-white/60">
            Đang tải dữ liệu...
          </p>
        ) : (
          <>
            <p className="text-lg mb-4">&ldquo;{quote}&rdquo;</p>
            <p className="text-xs text-black/50 dark:text-white/50">
              Dữ liệu được tạo lúc:{" "}
              <span className="font-[family-name:var(--font-geist-mono)]">
                {generatedAt}
              </span>
            </p>
          </>
        )}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="mt-4 text-sm rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-1.5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            Tải lại (client)
          </button>
        )}
      </div>
    </main>
  );
}
