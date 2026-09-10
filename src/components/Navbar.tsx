"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-5 py-4">
      <div className="flex items-center justify-between">

        <div className="font-bold text-lg">
          🐾 Tiệm Chó Mèo Vui Vẻ
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/">Trang chủ</a>

          <a href="/products">
            Sản phẩm
          </a>

          <a href="/about">
            Giới thiệu
          </a>
          <a href="/admin">
                Admin
          </a>

          <a
            href="/cart"
            className="flex items-center gap-2"
          >
            🛒 Giỏ hàng
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-5">

          <button
            className="text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <a href="/cart" className="text-xl">
            🛒
          </a>

        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
            <a href="/" className="block">
                Trang chủ
            </a>

            <a href="/products" className="block">
                Sản phẩm
            </a>

            <a href="/about" className="block">
                Giới thiệu
            </a>
            <a href="/admin" className="block">
                Admin
            </a>
        </div>
      )}
    </nav>
  );
}