export type RenderingStrategy = "SSG" | "SSR" | "ISR" | "CSR";

export type DashboardSnapshot = {
  generatedAt: string;
  totalRevenue: number;
  pending: number;
  invoices: number;
  customers: number;
  revenue: { month: string; value: number }[];
  latestInvoices: { name: string; email: string; amount: number; initials: string }[];
};

const revenue = [
  { month: "T4", value: 32 }, { month: "T5", value: 47 },
  { month: "T6", value: 39 }, { month: "T7", value: 61 },
  { month: "T8", value: 56 }, { month: "T9", value: 74 },
];

const latestInvoices = [
  { name: "Nguyễn Minh Anh", email: "minhanh@acme.vn", amount: 8450000, initials: "MA" },
  { name: "Trần Gia Huy", email: "giahuy@acme.vn", amount: 6200000, initials: "GH" },
  { name: "Lê Bảo Ngọc", email: "baongoc@acme.vn", amount: 3950000, initials: "BN" },
  { name: "Phạm Quốc Bảo", email: "quocbao@acme.vn", amount: 2700000, initials: "QB" },
];

export function createDashboardSnapshot(strategy: RenderingStrategy): DashboardSnapshot {
  const now = new Date();
  const secondOffset = strategy === "SSR" || strategy === "CSR" ? now.getSeconds() : 0;
  return {
    generatedAt: now.toLocaleString("vi-VN", { hour12: false }),
    totalRevenue: 86_400_000 + secondOffset * 10_000,
    pending: 12_750_000, invoices: 128, customers: 64,
    revenue: revenue.map((item, index) => ({ ...item, value: item.value + (index === revenue.length - 1 ? secondOffset % 8 : 0) })),
    latestInvoices,
  };
}

export function wait(ms: number) { return new Promise((resolve) => setTimeout(resolve, ms)); }
