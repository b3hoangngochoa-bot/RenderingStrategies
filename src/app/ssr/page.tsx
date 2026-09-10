import { DashboardPage } from "@/components/dashboard";
import { createDashboardSnapshot, wait } from "@/lib/dashboard-data";
export const dynamic = "force-dynamic";
export default async function ServerDashboardPage() { await wait(350); return <DashboardPage snapshot={createDashboardSnapshot("SSR")} strategy="SSR" title="Dashboard theo từng request (SSR)" description="Mỗi lần tải trang, server lấy một snapshot mới rồi gửi HTML đã render về trình duyệt. Hãy refresh để thấy thời điểm đổi." />; }
