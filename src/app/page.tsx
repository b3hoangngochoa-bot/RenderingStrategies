"use client";

import { useState } from "react";
const products = [
  {
    name: "Hạt cho chó",
    category: "Chó",
    price: "150.000đ",
    image: "/img/Dogfood.webp",
  },
  {
    name: "Pate cho mèo",
    category: "Mèo",
    price: "90.000đ",
    image: "/img/Catfood.webp",
  },
  {
    name: "Xương cao su",
    category: "Đồ chơi",
    price: "120.000đ",
    image: "/img/Bone.webp",
  },
  {
    name: "Sữa tắm chó mèo",
    category: "Chăm sóc",
    price: "34.990đ",
    image: "/img/Shampoo.webp",
  },
];

export default function Home() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  function addToCart(product: (typeof products)[number]) {
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = oldCart.find(
      (item: any) => item.name === product.name
    );

    let newCart;

    if (existing) {
      newCart = oldCart.map((item: any) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [
        ...oldCart,
        {
          ...product,
          price: Number(String(product.price).replace(/[^\d]/g, "")),
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  }
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#26352b] pt-20">
      {/* Hero */}
      <section className="mx-4 mt-4 rounded-3xl bg-[#dfe9df] px-6 py-16 md:mx-10 md:px-16">
        <h1 className="text-4xl font-bold md:text-6xl">
          Happy Pet, 
          <br />
          <span className="text-[#6b8f71]">Happy Life.</span>
        </h1>

        <p className="mt-6 text-gray-600">
          Mọi thứ bạn cần cho các Boss iu của mình.
        </p>

        <button className="mt-8 rounded-full bg-[#26352b] px-7 py-3.5 font-semibold text-white">
          Mua hàng ngay
        </button>
      </section>

      {/* Categories */}
      <section className="px-6 py-12 md:px-12">
        <p className="text-sm font-semibold text-[#6b8f71]">
          DANH MỤC
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Sản phẩm cho thú cưng
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#f0dfcf] p-7">
            <div className="text-5xl">🐶</div>
            <h3 className="mt-4 text-xl font-bold">Chó</h3>
            <p className="mt-2 text-sm text-gray-600">Thức ăn và phụ kiện</p>
          </div>

          <div className="rounded-2xl bg-[#e4e0ef] p-7">
            <div className="text-5xl">🐱</div>
            <h3 className="mt-4 text-xl font-bold">Mèo</h3>
            <p className="mt-2 text-sm text-gray-600">Thức ăn và đồ dùng</p>
          </div>

          <div className="rounded-2xl bg-[#f2e7b8] p-7">
            <div className="text-5xl">🧸</div>
            <h3 className="mt-4 text-xl font-bold">Đồ chơi</h3>
            <p className="mt-2 text-sm text-gray-600">Đồ chơi cho thú cưng</p>
          </div>

          <div className="rounded-2xl bg-[#d8e6e1] p-7">
            <div className="text-5xl">🧴</div>
            <h3 className="mt-4 text-xl font-bold">Chăm sóc</h3>
            <p className="mt-2 text-sm text-gray-600">Sản phẩm vệ sinh</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-white px-6 py-12 md:px-12">
        <p className="text-sm font-semibold text-[#6b8f71]">
          SẢN PHẨM
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Sản phẩm nổi bật
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden rounded-2xl border bg-[#f8f7f2]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              <div className="p-5">
                <p className="text-xs font-semibold text-[#6b8f71]">
                  {product.category}
                </p>

                <h3 className="mt-2 font-bold">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold">{product.price}</span>

                  <button onClick={() => 
                  addToCart(product)}className="rounded-full bg-[#26352b] px-4 py-2 text-sm text-white">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 md:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="font-bold">
            🐾 Tiệm <span className="text-[#6b8f71]">Chó Mèo Vui Vẻ</span>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 Tiệm Chó Mèo Vui Vẻ
          </p>
        </div>
      </footer>

    </main>
  );
}