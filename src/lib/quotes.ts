import { Quote } from "@/types/quote";

/**
 * Nguồn dữ liệu duy nhất cho URL + cache option.
 * Chuỗi code hiển thị trên UI được sinh ra từ chính các constant này,
 * nên không bao giờ lệch với fetch thật.
 */
const API_RANDOM_1 = "https://dummyjson.com/quotes/random";
const API_RANDOM_3 = "https://dummyjson.com/quotes/random/3";

/** Số giây cache của ISR. Trang /isr phải đặt `export const revalidate` bằng giá trị này. */
export const REVALIDATE_SECONDS = 20;

/** Timeout cho mọi fetch, tránh trang treo vô hạn khi API chậm. */
const FETCH_TIMEOUT_MS = 8000;

export const SSR_FETCH_CODE = `fetch("${API_RANDOM_1}", { cache: "no-store" })`;

export const ISR_FETCH_CODE = `fetch("${API_RANDOM_3}", { next: { revalidate: ${REVALIDATE_SECONDS} } })`;

export const FALLBACK_QUOTES: Quote[] = [
  {
    id: 1,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration",
  },
  {
    id: 2,
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
  },
  {
    id: 3,
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Future",
  },
  {
    id: 4,
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Wisdom",
  },
  {
    id: 5,
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success",
  },
  {
    id: 6,
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance",
  },
  {
    id: 7,
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Courage",
  },
  {
    id: 8,
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Action",
  },
];

export async function getRealtimeQuoteSSR(): Promise<{ quote: Quote; timestamp: string }> {
  const timestamp = new Date().toISOString();
  try {
    const res = await fetch(API_RANDOM_1, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    return {
      quote: {
        id: data.id,
        quote: data.quote,
        author: data.author,
        category: "Realtime",
      },
      timestamp,
    };
  } catch (err) {
    console.warn("SSR API fetch failed, using fallback quote:", err);
    // Return a random quote from fallbacks
    const randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return {
      quote: randomFallback,
      timestamp,
    };
  }
}

export async function getCuratedQuotesISR(): Promise<{ quotes: Quote[]; timestamp: string }> {
  const timestamp = new Date().toISOString();
  try {
    const res = await fetch(API_RANDOM_3, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    const quotesArray = Array.isArray(data) ? data : data.quotes || [];
    const mappedQuotes: Quote[] = quotesArray.map((q: { id: number; quote: string; author: string }) => ({
      id: q.id,
      quote: q.quote,
      author: q.author,
      category: "Curated",
    }));

    return {
      quotes: mappedQuotes,
      timestamp,
    };
  } catch (err) {
    console.warn("ISR API fetch failed, using fallback quotes:", err);
    const shuffled = [...FALLBACK_QUOTES].sort(() => Math.random() - 0.5);
    return {
      quotes: shuffled.slice(0, 3),
      timestamp,
    };
  }
}

