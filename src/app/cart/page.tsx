"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function removeItem(id: number) {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function changeQuantity(id: number, amount: number) {
    const newCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + amount,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#f8f7f2] pt-24 px-5 pb-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Giỏ hàng
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-lg mb-4">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>

            <a
              href="/"
              className="inline-block bg-[#26352b] text-white px-5 py-3 rounded-lg"
            >
              Tiếp tục mua hàng
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* Danh sách sản phẩm */}
            <div className="md:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 flex gap-4 items-center"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="font-bold text-lg">
                      {item.name}
                    </h2>

                    <p className="text-[#6b8f71] font-semibold mt-1">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className="w-8 h-8 rounded bg-gray-200"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        className="w-8 h-8 rounded bg-gray-200"
                      >
                        +
                      </button>

                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    Xóa
                  </button>

                </div>
              ))}

            </div>

            {/* Tổng tiền */}
            <div className="bg-white rounded-xl p-6 h-fit">

              <h2 className="text-xl font-bold mb-5">
                Tổng đơn hàng
              </h2>

              <div className="flex justify-between mb-4">
                <span>Tạm tính</span>
                <span>
                  {total.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span>
                  {total.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <button className="w-full bg-[#26352b] text-white py-3 rounded-lg mt-6">
                Thanh toán
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}