// SSR – Server Side Rendering
// - Đây là Server Component (mặc định trong Next.js 14 App Router)
// - KHÔNG có "use client" directive
// - Fetch với cache: "no-store" → render fresh mỗi request
// - HTML được tạo trên server → tốt cho SEO

import Link from "next/link";
import { products, formatPrice, type Product } from "@/lib/products";

// Simulate server-side data fetch (no-store = fresh every request)
async function getProducts() {
  // Trong thực tế, đây là fetch tới API bên ngoài:
  // const res = await fetch("https://api.example.com/products", { cache: "no-store" });
  // return res.json();

  // Demo: Simulate async fetch delay trên server
  await new Promise((resolve) => setTimeout(resolve, 100));

  const timestamp = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return { products, timestamp };
}

export default async function SSRPage() {
  // ── Fetch data SERVER-SIDE (mỗi request gọi lại) ──
  const { products: allProducts, timestamp } = await getProducts();

  const hotProducts = allProducts.filter((p) => p.tag === "HOT" || p.rating >= 4.8);
  const newProducts = allProducts.filter((p) => p.tag === "NEW");
  const saleProducts = allProducts.filter((p) => p.tag === "SALE");

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span className="badge badge-ssr">⚡ SERVER SIDE RENDERING</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>
            Server Component · cache: &quot;no-store&quot;
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 40,
            letterSpacing: "-1.5px",
            marginBottom: 10,
          }}
        >
          Sản Phẩm{" "}
          <span className="gradient-text" style={{ fontSize: "inherit" }}>
            Nổi Bật
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
          Được render trực tiếp trên server mỗi khi bạn truy cập trang này
        </p>

        {/* SSR Info Box */}
        <div className="render-info-box" style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: "var(--accent-primary)", fontSize: 13 }}>
                Cách hoạt động của SSR:
              </strong>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.7 }}>
                Trang này là <strong>Server Component</strong> (không có{" "}
                <code style={{ color: "var(--accent-primary)" }}>&quot;use client&quot;</code>).
                Hàm{" "}
                <code style={{ color: "var(--accent-primary)" }}>getProducts()</code> chạy trên
                server với{" "}
                <code style={{ color: "var(--accent-primary)" }}>cache: &quot;no-store&quot;</code> →
                HTML hoàn chỉnh được gửi đến browser. Mỗi request = render mới.
              </p>
            </div>
            {/* Render Timestamp – chứng minh SSR fresh mỗi request */}
            <div
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                background: "rgba(108,99,255,0.1)",
                border: "1px solid rgba(108,99,255,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2 }}>
                🕐 Render lúc:
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-primary)", fontFamily: "monospace" }}>
                {timestamp}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── HOT Products ─── */}
      <section style={{ marginBottom: 56 }}>
        <div className="section-header">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap" }}>
            🔥 Sản phẩm Hot
          </h2>
          <div className="section-line" />
          <span style={{ fontSize: 13, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            {hotProducts.length} sản phẩm
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {hotProducts.map((product) => (
            <SSRProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── NEW Products ─── */}
      <section style={{ marginBottom: 56 }}>
        <div className="section-header">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap" }}>
            ✨ Hàng mới về
          </h2>
          <div className="section-line" />
          <span style={{ fontSize: 13, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            {newProducts.length} sản phẩm
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {newProducts.map((product) => (
            <SSRProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── SALE Products ─── */}
      <section style={{ marginBottom: 56 }}>
        <div className="section-header">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap" }}>
            💸 Khuyến mãi
          </h2>
          <div className="section-line" />
          <span style={{ fontSize: 13, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            {saleProducts.length} sản phẩm
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {saleProducts.map((product) => (
            <SSRProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── All products ─── */}
      <section>
        <div className="section-header">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap" }}>
            👟 Tất cả sản phẩm
          </h2>
          <div className="section-line" />
          <Link
            href="/csr"
            style={{
              fontSize: 13,
              color: "var(--accent-cyan)",
              textDecoration: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            🔄 Xem CSR version →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {allProducts.map((product) => (
            <SSRProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Server-rendered Product Card (no interactivity) ──
function SSRProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/ssr/${product.id}`} style={{ textDecoration: "none" }}>
      <div className="product-card">
        {/* Image */}
        <div className="image-wrapper" style={{ height: 200, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 90,
              zIndex: 1,
            }}
          >
            {product.emoji}
          </div>

          {/* Badges */}
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, display: "flex", gap: 6 }}>
            {product.tag && (
              <span className={`tag ${product.tag === "SALE" ? "tag-sale" : product.tag === "NEW" ? "tag-new" : "tag-hot"}`}>
                {product.tag}
              </span>
            )}
            {discount && (
              <span className="tag" style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
                -{discount}%
              </span>
            )}
          </div>

          {!product.inStock && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(10,10,15,0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <span
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  background: "rgba(255,101,132,0.2)",
                  border: "1px solid var(--accent-secondary)",
                  color: "var(--accent-secondary)",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-primary)" }}>
              {product.brand}
            </span>
            <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: 8 }}>
              · {product.category}
            </span>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 8 }}>
            {product.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ color: "#fbbf24", fontSize: 12 }}>
              {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text-primary)" }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through" }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {product.colors.map((color) => (
              <div key={color} style={{ width: 18, height: 18, borderRadius: "50%", background: color, border: "2px solid var(--border-color)" }} />
            ))}
          </div>
          <div className="btn-primary" style={{ width: "100%", textAlign: "center", fontSize: 13, padding: "10px" }}>
            Xem chi tiết →
          </div>
        </div>
      </div>
    </Link>
  );
}
