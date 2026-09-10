import Link from "next/link";
import { products, formatPrice } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section
        className="hero-bg"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <div>
            <div className="badge badge-new" style={{ marginBottom: 20 }}>
              ✨ Bộ sưu tập mới 2024
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 5vw, 68px)",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                marginBottom: 24,
                color: "var(--text-primary)",
              }}
            >
              Bước Đi{" "}
              <span className="gradient-text">Phong Cách,</span>
              <br />
              Chạy Với{" "}
              <span className="gradient-text-orange">Đam Mê</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Khám phá bộ sưu tập giày thể thao cao cấp được tuyển chọn từ những thương
              hiệu hàng đầu thế giới. Mỗi đôi giày là một câu chuyện, mỗi bước chân là một
              thành tích.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/csr" className="btn-primary">
                🔄 Khám phá CSR
              </Link>
              <Link href="/ssr" className="btn-outline">
                ⚡ Xem SSR
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 40,
                marginTop: 48,
                paddingTop: 40,
                borderTop: "1px solid var(--border-color)",
              }}
            >
              {[
                { value: "500+", label: "Sản phẩm" },
                { value: "50K+", label: "Khách hàng" },
                { value: "4.9★", label: "Đánh giá" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: 28,
                      color: "var(--text-primary)",
                    }}
                    className="gradient-text"
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Big Emoji Sneaker Display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="float-anim"
              style={{
                fontSize: 180,
                lineHeight: 1,
                filter: "drop-shadow(0 30px 60px rgba(108,99,255,0.4))",
                textAlign: "center",
              }}
            >
              👟
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {["Nike", "Adidas", "HOKA", "ASICS", "Brooks"].map((brand) => (
                <span
                  key={brand}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(108,99,255,0.1)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RENDERING MODES EXPLANATION ─── */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 36,
              letterSpacing: "-1px",
              marginBottom: 12,
            }}
          >
            Demo{" "}
            <span className="gradient-text">Rendering Strategies</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            Next.js 14 App Router – Thực nghiệm các kiểu render
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {/* CSR Card */}
          <Link href="/csr" style={{ textDecoration: "none" }}>
            <div
              className="glass-card"
              style={{ padding: 32, height: "100%", cursor: "pointer" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))",
                  border: "1px solid rgba(0,212,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                🔄
              </div>
              <div className="badge badge-csr" style={{ marginBottom: 16 }}>
                CSR — Client Side Rendering
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "var(--text-primary)",
                }}
              >
                Cửa hàng – Tìm kiếm &amp; Filter
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Sử dụng <code style={{ color: "var(--accent-cyan)" }}>{'"use client"'}</code> +{" "}
                <code style={{ color: "var(--accent-cyan)" }}>useEffect</code> +{" "}
                <code style={{ color: "var(--accent-cyan)" }}>useState</code> để render
                danh sách sản phẩm phía client, với tính năng search và filter theo brand/category.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {["useEffect", "useState", "Client Component", "Real-time filter"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "rgba(0,212,255,0.1)",
                        color: "var(--accent-cyan)",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </Link>

          {/* SSR Card */}
          <Link href="/ssr" style={{ textDecoration: "none" }}>
            <div
              className="glass-card"
              style={{ padding: 32, height: "100%", cursor: "pointer" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(108,99,255,0.05))",
                  border: "1px solid rgba(108,99,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                ⚡
              </div>
              <div className="badge badge-ssr" style={{ marginBottom: 16 }}>
                SSR — Server Side Rendering
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "var(--text-primary)",
                }}
              >
                Sản phẩm nổi bật – Server render
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Server Component thuần, fetch data với{" "}
                <code style={{ color: "var(--accent-primary)" }}>
                  {'cache: "no-store"'}
                </code>{" "}
                để render HTML tươi mới theo từng request. Tốt cho SEO và dữ liệu real-time.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {["Server Component", "no-store", "SEO-friendly", "Fresh data"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "rgba(108,99,255,0.1)",
                        color: "var(--accent-primary)",
                        border: "1px solid rgba(108,99,255,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div className="section-header">
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 28,
              whiteSpace: "nowrap",
            }}
          >
            🔥 Sản phẩm nổi bật
          </h2>
          <div className="section-line" />
          <Link
            href="/ssr"
            style={{
              fontSize: 13,
              color: "var(--accent-primary)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            Xem tất cả →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/ssr/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="product-card">
                {/* Image Area */}
                <div
                  className="image-wrapper"
                  style={{ height: 200, position: "relative" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 90,
                    }}
                  >
                    {product.emoji}
                  </div>
                  {product.tag && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 10,
                      }}
                    >
                      <span
                        className={`tag ${
                          product.tag === "SALE"
                            ? "tag-sale"
                            : product.tag === "NEW"
                            ? "tag-new"
                            : "tag-hot"
                        }`}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: "var(--accent-primary)",
                          marginBottom: 4,
                        }}
                      >
                        {product.brand}
                      </div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          lineHeight: 1.3,
                        }}
                      >
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ color: "#fbbf24", fontSize: 13 }}>
                      {"★".repeat(Math.floor(product.rating))}
                    </span>
                    <span
                      style={{ fontSize: 12, color: "var(--text-muted)" }}
                    >
                      {product.rating} ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 20,
                        color: "var(--text-primary)",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
