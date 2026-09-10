"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products, categories, brands, formatPrice, type Product } from "@/lib/products";

// ──────────────────────────────────────────────
// CSR: Client Side Rendering
// - "use client" directive ở đầu file
// - Dữ liệu được load và filter hoàn toàn trên browser
// - useEffect để simulate fetching (loading state)
// - useState để quản lý filter, search, cart
// ──────────────────────────────────────────────

export default function CSRPage() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "reviews">("rating");
  const [cart, setCart] = useState<number[]>([]);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  // ── Simulate CSR data fetch (browser-side) ──
  useEffect(() => {
    setLoading(true);
    // Giả lập fetch API delay (đây là CSR: fetch xảy ra trên browser)
    const timer = setTimeout(() => {
      setAllProducts(products);
      setFiltered(products);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ── Filter & Sort logic (chạy hoàn toàn trên client) ──
  useEffect(() => {
    let result = [...allProducts];

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== "Tất cả") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== "Tất cả") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFiltered(result);
  }, [search, selectedCategory, selectedBrand, sortBy, allProducts]);

  function addToCart(id: number) {
    setCart((prev) => [...prev, id]);
    setAddedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span className="badge badge-csr">🔄 CLIENT SIDE RENDERING</span>
          <span
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "monospace",
            }}
          >
            &quot;use client&quot; + useState + useEffect
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
          Cửa Hàng{" "}
          <span className="gradient-text" style={{ fontSize: "inherit" }}>
            Giày Thể Thao
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
          Filter, search và sắp xếp hoàn toàn trên browser – không reload trang
        </p>

        {/* CSR Info Box */}
        <div className="render-info-box" style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 20 }}>💡</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: "var(--accent-cyan)", fontSize: 13 }}>
                Cách hoạt động của CSR:
              </strong>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.7 }}>
                Trang này dùng <code style={{ color: "var(--accent-cyan)" }}>&quot;use client&quot;</code> để trở thành
                Client Component. Data được{" "}
                <code style={{ color: "var(--accent-cyan)" }}>useEffect</code> fetch sau khi
                browser render HTML rỗng. Mọi tương tác filter/search đều chạy bằng{" "}
                <code style={{ color: "var(--accent-cyan)" }}>useState</code> hoàn toàn phía
                client → không cần reload.
              </p>
            </div>
            {cart.length > 0 && (
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: 999,
                  background: "var(--accent-primary)",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                🛒 {cart.length} sản phẩm
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Search & Filters ─── */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Tìm kiếm theo tên, thương hiệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-products"
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {/* Category Filter */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: 10 }}>
              Danh mục
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: 10 }}>
              Thương hiệu
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`filter-pill ${selectedBrand === brand ? "active" : ""}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort & Results count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {loading ? "Đang tải..." : `${filtered.length} sản phẩm`}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 13,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="rating">⭐ Đánh giá cao nhất</option>
            <option value="reviews">💬 Nhiều đánh giá nhất</option>
            <option value="price-asc">💰 Giá: Thấp → Cao</option>
            <option value="price-desc">💎 Giá: Cao → Thấp</option>
          </select>
        </div>
      </div>

      {/* ─── Product Grid ─── */}
      {loading ? (
        // Skeleton loading (CSR loading state)
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="shimmer" style={{ height: 200 }} />
              <div style={{ padding: 20 }}>
                <div className="shimmer" style={{ height: 12, borderRadius: 6, marginBottom: 10, width: "60%" }} />
                <div className="shimmer" style={{ height: 18, borderRadius: 6, marginBottom: 10 }} />
                <div className="shimmer" style={{ height: 14, borderRadius: 6, marginBottom: 16, width: "80%" }} />
                <div className="shimmer" style={{ height: 24, borderRadius: 6, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>😕</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Không tìm thấy sản phẩm
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Thử thay đổi từ khóa hoặc bộ lọc của bạn
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("Tất cả");
              setSelectedBrand("Tất cả");
            }}
            className="btn-primary"
            style={{ marginTop: 20 }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              justAdded={addedIds.has(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Product Card Component ──
function ProductCard({
  product,
  onAddToCart,
  justAdded,
}: {
  product: Product;
  onAddToCart: (id: number) => void;
  justAdded: boolean;
}) {
  const discount =
    product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  return (
    <div className="product-card">
      {/* Image Area */}
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

        {/* Top badges */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, display: "flex", gap: 6 }}>
          {product.tag && (
            <span
              className={`tag ${product.tag === "SALE" ? "tag-sale" : product.tag === "NEW" ? "tag-new" : "tag-hot"
                }`}
            >
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
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--accent-primary)",
            }}
          >
            {product.brand}
          </span>
          <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: 8 }}>
            · {product.category}
          </span>
        </div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
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

        {/* Color dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {product.colors.map((color) => (
            <div
              key={color}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: color,
                border: "2px solid var(--border-color)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href={`/ssr/${product.id}`}
            className="btn-outline"
            style={{ flex: 1, fontSize: 13, padding: "10px 12px" }}
          >
            Chi tiết
          </Link>
          <button
            className="btn-primary"
            style={{
              flex: 1,
              fontSize: 13,
              padding: "10px 12px",
              opacity: product.inStock ? 1 : 0.5,
              cursor: product.inStock ? "pointer" : "not-allowed",
              background: justAdded
                ? "linear-gradient(135deg, #10b981, #059669)"
                : undefined,
            }}
            onClick={() => product.inStock && onAddToCart(product.id)}
            disabled={!product.inStock}
          >
            {justAdded ? "✓ Đã thêm" : product.inStock ? "🛒 Thêm giỏ" : "Hết hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}
