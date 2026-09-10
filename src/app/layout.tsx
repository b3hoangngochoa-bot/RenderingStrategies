import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SneakerVault – Premium Sneaker Store",
  description:
    "Khám phá bộ sưu tập giày thể thao cao cấp tại SneakerVault. Thương hiệu hàng đầu, phong cách đỉnh cao.",
};

function Navbar() {
  return (
    <nav className="navbar">
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            👟
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.5px",
              color: "var(--text-primary)",
            }}
          >
            Sneaker<span className="gradient-text">Vault</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <NavLink href="/" label="Trang Chủ" />
          <NavLink href="/csr" label="🔄 CSR" />
          <NavLink href="/ssr" label="⚡ SSR" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: "8px 16px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        color: "var(--text-secondary)",
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
      className="nav-link-hover"
    >
      {label}
    </Link>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>👟</span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: "var(--text-primary)",
              }}
            >
              Sneaker<span className="gradient-text">Vault</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
            Điểm đến cho những đôi giày thể thao cao cấp, phong cách đỉnh cao của thế hệ.
          </p>
        </div>
        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            Rendering Modes
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/csr" style={{ textDecoration: "none", color: "var(--accent-cyan)", fontSize: 14 }}>
              🔄 Client-Side Rendering (CSR)
            </Link>
            <Link href="/ssr" style={{ textDecoration: "none", color: "var(--accent-primary)", fontSize: 14 }}>
              ⚡ Server-Side Rendering (SSR)
            </Link>
          </div>
        </div>
        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            Sinh Viên
          </h4>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Nguyễn Thái Tuấn</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>N23DCPT054</p>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid var(--border-color)",
          padding: "20px 24px",
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-muted)",
        }}
      >
        © 2024 SneakerVault – Demo Next.js 14 Rendering Strategies
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .nav-link-hover:hover {
            color: var(--text-primary) !important;
            background: rgba(108, 99, 255, 0.1);
          }
        `}</style>
      </head>
      <body style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 64px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
