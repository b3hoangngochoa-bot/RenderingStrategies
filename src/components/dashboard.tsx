import Link from "next/link";
import type { DashboardSnapshot, RenderingStrategy } from "@/lib/dashboard-data";

const navItems: { href: string; label: string; strategy: RenderingStrategy }[] = [
  { href: "/", label: "Tĩnh (SSG)", strategy: "SSG" },
  { href: "/ssr", label: "Mỗi request (SSR)", strategy: "SSR" },
  { href: "/isr", label: "Tái tạo (ISR)", strategy: "ISR" },
  { href: "/csr", label: "Trình duyệt (CSR)", strategy: "CSR" },
];
const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });

export function DashboardPage({ snapshot, strategy, title, description }: { snapshot: DashboardSnapshot; strategy: RenderingStrategy; title: string; description: string }) {
  const highestRevenue = Math.max(...snapshot.revenue.map((item) => item.value));
  return <main className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="Trang SSG"><span className="brand-mark">R</span><span>RenderLab</span></Link>
      <p className="sidebar-label">CHIẾN THUẬT RENDER</p>
      <nav className="navigation" aria-label="Chọn chiến thuật render">
        {navItems.map((item) => <Link className={strategy === item.strategy ? "nav-item active" : "nav-item"} href={item.href} key={item.href}><span className="nav-dot" />{item.label}</Link>)}
      </nav>
      <div className="sidebar-note"><span>Next.js 14</span><strong>App Router</strong></div>
    </aside>
    <section className="content">
      <header className="page-header"><div><p className="eyebrow">BÀI TẬP RENDERING STRATEGIES</p><h1>{title}</h1><p className="description">{description}</p></div><div className="render-info"><span className={`strategy-pill ${strategy.toLowerCase()}`}>{strategy}</span><small>Snapshot: {snapshot.generatedAt}</small></div></header>
      <section className="stats-grid" aria-label="Tổng quan số liệu">
        <MetricCard icon="₫" label="Doanh thu đã thu" value={currency.format(snapshot.totalRevenue)} accent="blue" /><MetricCard icon="◷" label="Đang chờ xử lý" value={currency.format(snapshot.pending)} accent="orange" /><MetricCard icon="▣" label="Tổng hoá đơn" value={String(snapshot.invoices)} accent="purple" /><MetricCard icon="◉" label="Khách hàng" value={String(snapshot.customers)} accent="green" />
      </section>
      <section className="dashboard-grid">
        <article className="panel revenue-panel"><div className="panel-heading"><div><p className="panel-kicker">PHÂN TÍCH</p><h2>Doanh thu 6 tháng</h2></div><span className="period">Tháng 4 – Tháng 9</span></div><div className="chart" aria-label="Biểu đồ doanh thu">{snapshot.revenue.map((item) => <div className="bar-group" key={item.month}><span className="bar-value">{item.value}M</span><div className="bar-track"><div className="bar" style={{ height: `${(item.value / highestRevenue) * 100}%` }} /></div><span className="bar-label">{item.month}</span></div>)}</div><p className="chart-caption"><span className="legend-dot" />Dữ liệu doanh thu mô phỏng (triệu VND)</p></article>
        <article className="panel invoices-panel"><div className="panel-heading"><div><p className="panel-kicker">HOẠT ĐỘNG</p><h2>Hoá đơn gần đây</h2></div><button className="plain-button" type="button">Xem tất cả</button></div><div className="invoice-list">{snapshot.latestInvoices.map((invoice) => <div className="invoice" key={invoice.email}><span className="avatar">{invoice.initials}</span><div className="invoice-person"><strong>{invoice.name}</strong><span>{invoice.email}</span></div><strong className="invoice-amount">{currency.format(invoice.amount)}</strong></div>)}</div><p className="updated">↻ Snapshot được tạo lúc {snapshot.generatedAt}</p></article>
      </section>
      <section className="strategy-summary"><strong>Đang xem {strategy}.</strong> So sánh thời điểm “Snapshot” khi chuyển trang hoặc refresh để quan sát cách cache/render hoạt động.</section>
    </section>
  </main>;
}

function MetricCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) { return <article className={`metric-card ${accent}`}><span className="metric-icon">{icon}</span><p>{label}</p><strong>{value}</strong></article>; }
