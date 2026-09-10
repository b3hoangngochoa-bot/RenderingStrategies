"use client";
import { useEffect, useState } from "react";
import { DashboardPage } from "@/components/dashboard";
import type { DashboardSnapshot } from "@/lib/dashboard-data";

export default function ClientDashboard() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { fetch("/api/metrics", { cache: "no-store" }).then((response) => { if (!response.ok) throw new Error("Không thể lấy dữ liệu"); return response.json(); }).then(setSnapshot).catch(() => setError(true)); }, []);
  if (error) return <main className="loading-screen">Không thể tải dữ liệu dashboard. Hãy thử refresh lại trang.</main>;
  if (!snapshot) return <main className="loading-screen"><span className="loading-spinner" />Đang tải dữ liệu ở trình duyệt…</main>;
  return <DashboardPage snapshot={snapshot} strategy="CSR" title="Dashboard phía trình duyệt (CSR)" description="Server chỉ gửi giao diện ban đầu. Sau khi JavaScript chạy, useEffect gọi API và React cập nhật số liệu trên trình duyệt." />;
}
