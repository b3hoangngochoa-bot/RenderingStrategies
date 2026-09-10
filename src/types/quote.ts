export interface Quote {
  id: number;
  quote: string;
  author: string;
  /** Nguồn dữ liệu: "Realtime" (SSR), "Curated" (ISR), hoặc category gốc khi fallback. */
  category: string;
}
