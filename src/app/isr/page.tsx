import { DashboardPage } from "@/components/dashboard";
import { createDashboardSnapshot } from "@/lib/dashboard-data";
export const revalidate = 10;
export default function IsrDashboardPage() { return <DashboardPage snapshot={createDashboardSnapshot("ISR")} strategy="ISR" title="Dashboard làm mới theo chu kỳ (ISR)" description="Trang được phục vụ nhanh từ cache như SSG, nhưng Next.js cho phép tái tạo phiên bản mới sau mỗi 10 giây." />; }
