"use client";

import { useMemo, useState } from "react";

export type Shoe = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ShoeStoreClient({ initialShoes }: { initialShoes: Shoe[] }) {
  const [shoes] = useState<Shoe[]>(initialShoes);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [cart, setCart] = useState<Shoe[]>([]);

  const filteredShoes = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return shoes.filter((shoe) => {
      const matchCategory = category === "all" || shoe.category === category;
      const matchSearch = !keyword || shoe.name.toLowerCase().includes(keyword);
      return matchCategory && matchSearch;
    });
  }, [shoes, category, query]);

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "running", label: "Chạy bộ" },
    { value: "sneaker", label: "Thời trang" },
    { value: "basketball", label: "Bóng rổ" },
  ];

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-3xl font-extrabold">SneakerStore</h1>
          <p className="text-gray-400 text-sm mt-1">Ứng dụng Demo CSR + SSR</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tên giày..."
            className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 w-full md:w-64"
          />
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap">
            🛒 Giỏ hàng: {cart.length}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit space-y-4">
          <h2 className="font-bold text-lg text-gray-800">Danh mục sản phẩm</h2>
          <nav className="flex flex-col gap-2">
            {categories.map((item) => (
              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${
                  category === item.value ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShoes.map((shoe) => (
              <div key={shoe.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <img src={shoe.image} alt={shoe.name} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {shoe.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-2">{shoe.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-lg font-extrabold text-gray-900">
                      {shoe.price.toLocaleString("vi-VN")} đ
                    </span>
                    <button
                      onClick={() => setCart((prev) => [...prev, shoe])}
                      className="bg-gray-900 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600"
                    >
                      + Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}