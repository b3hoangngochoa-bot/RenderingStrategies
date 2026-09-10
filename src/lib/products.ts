// Shared product data for the sneaker store

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  tag?: "NEW" | "SALE" | "HOT";
  emoji: string;
  colors: string[];
  description: string;
  features: string[];
  inStock: boolean;
  sizes: number[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Velocity Pro X",
    brand: "Nike",
    price: 3_200_000,
    originalPrice: 4_500_000,
    rating: 4.8,
    reviews: 2847,
    category: "Chạy bộ",
    tag: "SALE",
    emoji: "👟",
    colors: ["#1a1a2e", "#6c63ff", "#00d4ff"],
    description:
      "Đôi giày chạy bộ flagship với công nghệ đệm khí tiên tiến nhất. Nhẹ như gió, êm như mây, mạnh như vũ bão.",
    features: ["Air Zoom Max", "Flyknit Upper", "React Foam", "Carbon Plate"],
    inStock: true,
    sizes: [39, 40, 41, 42, 43, 44, 45],
  },
  {
    id: 2,
    name: "Ultraboost 23 Elite",
    brand: "Adidas",
    price: 4_100_000,
    rating: 4.9,
    reviews: 1923,
    category: "Chạy bộ",
    tag: "HOT",
    emoji: "🏃",
    colors: ["#ffffff", "#000000", "#ff6584"],
    description:
      "Công nghệ Boost mang đến năng lượng hoàn hảo với mỗi bước chân. Tối ưu cho marathon và training hằng ngày.",
    features: ["Boost Midsole", "Primeknit+", "Continental Rubber", "Linear Energy Push"],
    inStock: true,
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: 3,
    name: "Cloud X 3.0",
    brand: "On Running",
    price: 3_800_000,
    rating: 4.7,
    reviews: 1456,
    category: "Đa năng",
    tag: "NEW",
    emoji: "☁️",
    colors: ["#f0f0ff", "#6c63ff", "#ff8c42"],
    description:
      "Thiết kế tối giản, hiệu năng tối đa. CloudTec® mang lại cảm giác chạy như đang bước trên mây.",
    features: ["CloudTec®", "Helion Foam", "Speedboard", "Engineered Mesh"],
    inStock: true,
    sizes: [39, 40, 41, 42, 43, 44],
  },
  {
    id: 4,
    name: "Fresh Foam X 1080 v13",
    brand: "New Balance",
    price: 2_900_000,
    originalPrice: 3_600_000,
    rating: 4.6,
    reviews: 3201,
    category: "Đi bộ",
    tag: "SALE",
    emoji: "🎯",
    colors: ["#2a1a3a", "#00d4ff", "#ffffff"],
    description:
      "Vua của sự thoải mái. Fresh Foam X mang đến sự mềm mại, đệm hơn bao giờ hết cho những buổi đi bộ dài.",
    features: ["Fresh Foam X", "Hypoknit Upper", "Blown Rubber Outsole", "Ultra Heel"],
    inStock: true,
    sizes: [38, 39, 40, 41, 42, 43],
  },
  {
    id: 5,
    name: "GEL-Kayano 30",
    brand: "ASICS",
    price: 3_500_000,
    rating: 4.8,
    reviews: 2134,
    category: "Chạy bộ",
    tag: "HOT",
    emoji: "⚡",
    colors: ["#1a2a1a", "#ff6584", "#fbbf24"],
    description:
      "30 năm kinh nghiệm, một đôi giày hoàn hảo. GEL-Kayano 30 tái định nghĩa sự ổn định và thoải mái.",
    features: ["FF BLAST+ ECO", "GEL Technology", "PureGEL", "4D Guidance System"],
    inStock: true,
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: 6,
    name: "Clifton 9 Stellar",
    brand: "HOKA",
    price: 4_300_000,
    rating: 4.9,
    reviews: 1887,
    category: "Đường dài",
    tag: "NEW",
    emoji: "🌟",
    colors: ["#ff8c42", "#ffffff", "#6c63ff"],
    description:
      "Đệm siêu dày, trọng lượng siêu nhẹ. HOKA Clifton 9 là người bạn đồng hành lý tưởng cho mọi cung đường.",
    features: ["Compression-Molded EVA", "Extended Heel Crash Pad", "Meta-Rocker", "Light Mesh"],
    inStock: false,
    sizes: [39, 40, 41, 42, 43],
  },
  {
    id: 7,
    name: "Ghost 16 Speed",
    brand: "Brooks",
    price: 3_100_000,
    rating: 4.7,
    reviews: 1654,
    category: "Đa năng",
    emoji: "👻",
    colors: ["#16161f", "#00d4ff", "#ff6584"],
    description:
      "DNA LOFT v3 foam mang đến sự êm ái không tưởng. Brooks Ghost 16 – mượt mà từng bước, ngày qua ngày.",
    features: ["DNA LOFT v3", "Segmented Crash Pad", "3D Fit Print", "Element"],
    inStock: true,
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: 8,
    name: "Rincon 3 Swift",
    brand: "HOKA",
    price: 2_600_000,
    originalPrice: 3_200_000,
    rating: 4.5,
    reviews: 2456,
    category: "Chạy nhẹ",
    tag: "SALE",
    emoji: "💨",
    colors: ["#ffffff", "#6c63ff", "#fbbf24"],
    description:
      "Nhẹ nhất trong dòng HOKA, nhanh nhất cho những buổi tập tốc độ. Rincon 3 là lựa chọn của runner tốc độ.",
    features: ["Full-EVA Midsole", "Early-Stage Meta-Rocker", "Mesh Upper", "Rubber Zones"],
    inStock: true,
    sizes: [39, 40, 41, 42, 43, 44],
  },
];

export const categories = ["Tất cả", "Chạy bộ", "Đa năng", "Đi bộ", "Đường dài", "Chạy nhẹ"];

export const brands = ["Tất cả", "Nike", "Adidas", "On Running", "New Balance", "ASICS", "HOKA", "Brooks"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}
