// SSR – Chi tiết sản phẩm (Dynamic Route)
// Route: /ssr/[id]
// - Server Component, render mỗi request
// - generateMetadata cho SEO dynamic
// - cache: "no-store" → fresh data mỗi request

import { notFound } from "next/navigation";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import type { Metadata } from "next";

// ── Dynamic Metadata (SSR – SEO) ──
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) return { title: "Sản phẩm không tồn tại" };

  return {
    title: `${product.name} – ${product.brand} | SneakerVault`,
    description: product.description,
  };
}

// ── Server-side data fetch ──
async function getProductById(id: string) {
  // Demo: simulate async server fetch với cache: "no-store"
  await new Promise((resolve) => setTimeout(resolve, 50));

  const product = products.find((p) => p.id === parseInt(id));

  const timestamp = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return { product: product ?? null, timestamp };
}

// ── SSR Product Detail Page ──
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { product, timestamp } = await getProductById(params.id);

  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "var(--text-muted)" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <span>›</span>
        <Link href="/ssr" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          SSR
        </Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
      </nav>

      {/* ─── SSR Badge & Timestamp ─── */}
      <div
        className="render-info-box"
        style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="badge badge-ssr">⚡ SSR – Dynamic Route</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>
            /ssr/{params.id}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>🕐 Render lúc:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-primary)", fontFamily: "monospace" }}>
            {timestamp}
          </span>
        </div>
      </div>

      {/* ─── Main Product Detail ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          marginBottom: 64,
        }}
      >
        {/* Left: Product Image */}
        <div>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a28, #2a1a3a, #1a2a3a)",
              borderRadius: 24,
              height: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 180,
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, rgba(108,99,255,0.2) 0%, transparent 70%)",
              }}
            />
            <span className="float-anim" style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 40px rgba(108,99,255,0.4))" }}>
              {product.emoji}
            </span>

            {/* Badges overlay */}
            <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
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
                  background: "rgba(10,10,15,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--accent-secondary)", border: "2px solid var(--accent-secondary)", padding: "12px 28px", borderRadius: 12 }}>
                  Hết hàng
                </span>
              </div>
            )}
          </div>

          {/* Color options */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, fontWeight: 600 }}>
              MÀU SẮC CÓ SẴN
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  title={color}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: color,
                    border: i === 0 ? "3px solid var(--accent-primary)" : "2px solid var(--border-color)",
                    cursor: "pointer",
                    boxShadow: i === 0 ? "0 0 12px rgba(108,99,255,0.5)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Brand & Category */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--accent-primary)" }}>
              {product.brand}
            </span>
            <span style={{ fontSize: 12, color: "var(--border-color)" }}>·</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{product.category}</span>
          </div>

          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              letterSpacing: "-1px",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: star <= Math.floor(product.rating) ? "#fbbf24" : "var(--text-muted)", fontSize: 18 }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{product.rating}</span>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              ({product.reviews.toLocaleString()} đánh giá)
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 42,
                  color: "var(--text-primary)",
                  letterSpacing: "-1px",
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 20, color: "var(--text-muted)", textDecoration: "line-through" }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount && (
              <span
                style={{
                  fontSize: 14,
                  color: "#10b981",
                  fontWeight: 600,
                  marginTop: 4,
                  display: "block",
                }}
              >
                ✓ Tiết kiệm {formatPrice(product.originalPrice! - product.price)} ({discount}% OFF)
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: 24,
              paddingBottom: 24,
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            {product.description}
          </p>

          {/* Features */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
              CÔNG NGHỆ ĐẶC TRƯNG
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.features.map((feature) => (
                <span
                  key={feature}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    background: "rgba(108,99,255,0.1)",
                    color: "var(--accent-primary)",
                    border: "1px solid rgba(108,99,255,0.2)",
                  }}
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
              SIZE (EU)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.sizes.map((size) => (
                <div
                  key={size}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <Link
              href="/csr"
              className="btn-outline"
              style={{ flex: 1, fontSize: 14 }}
            >
              🛒 Thêm vào giỏ
            </Link>
            <button
              className="btn-primary"
              style={{ flex: 2, fontSize: 15 }}
              disabled={!product.inStock}
            >
              {product.inStock ? "⚡ Mua ngay" : "Hết hàng"}
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: "flex", gap: 20, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-color)" }}>
            {[
              { icon: "🚚", label: "Miễn phí vận chuyển" },
              { icon: "🔄", label: "Đổi trả 30 ngày" },
              { icon: "✅", label: "Chính hãng 100%" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="section-header">
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap" }}>
              👟 Sản phẩm liên quan
            </h2>
            <div className="section-line" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/ssr/${related.id}`} style={{ textDecoration: "none" }}>
                <div className="product-card">
                  <div className="image-wrapper" style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 70, position: "relative", zIndex: 1 }}>{related.emoji}</span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-primary)", marginBottom: 4 }}>
                      {related.brand}
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.3 }}>
                      {related.name}
                    </h4>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
                      {formatPrice(related.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
