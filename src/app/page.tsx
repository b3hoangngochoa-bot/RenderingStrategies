import { DashboardPage } from "@/components/dashboard";
import { createDashboardSnapshot } from "@/lib/dashboard-data";

// SSG: trang này được tạo khi `next build` và dùng lại cho mọi lượt truy cập.
export const dynamic = "force-static";
export const revalidate = false;

export default function StaticDashboardPage() {
  return <DashboardPage snapshot={createDashboardSnapshot("SSG")} strategy="SSG" title="Dashboard tĩnh (SSG)" description="Dữ liệu và HTML được tạo sẵn lúc build. Phù hợp với nội dung ít thay đổi như trang giới thiệu hoặc báo cáo công khai." />;
}
