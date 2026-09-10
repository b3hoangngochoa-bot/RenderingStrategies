"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function AdminPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    async function getProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProductList(data);
    }

    getProducts();
  }, []);

  async function deleteProduct(id: number) {
  await fetch("/api/products", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  setProductList(
    productList.filter((product) => product.id !== id)
  );
}
  function editProduct(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setImage(product.image);
  }

async function updateProduct() {
  if (editingId === null) {
    return;
  }
  if (!name || !category || !price) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const updatedProduct = {
    id: editingId,
    name: name,
    category: category,
    price: Number(price),
    image: image,
  };

  await fetch("/api/products", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  const newList = productList.map((product) =>
    product.id === editingId
      ? updatedProduct
      : product
  );

  setProductList(newList);

  setEditingId(null);
  setName("");
  setCategory("");
  setPrice("");
  setImage("");
}

  return (
    <main className="min-h-screen bg-[#f8f7f2] pt-24 px-5 pb-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Quản trị sản phẩm
            </h1>

            <p className="mt-2 text-gray-600">
              Quản lý các sản phẩm của cửa hàng
            </p>
          </div>
        </div>

        {/* FORM */}
        {editingId !== null  && (
          <div className="mt-6 rounded-2xl border bg-white p-6">

            <h2 className="text-xl font-bold">
              Sửa sản phẩm
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border px-4 py-3"
              />

              <input
                type="text"
                placeholder="Danh mục"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border px-4 py-3"
              />

              <input
                type="number"
                placeholder="Giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-lg border px-4 py-3"
              />
              <input
                type="text"
                placeholder="Đường dẫn ảnh, ví dụ: /img/Dogfood.webp"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="rounded-lg border px-4 py-3"
              />

            </div>

            <button
              onClick={updateProduct}
              className="mt-4 rounded-lg bg-[#6b8f71] px-5 py-3 text-white"
            >
              Lưu thay đổi
            </button>

          </div>
        )}

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="mt-8 overflow-hidden rounded-2xl border bg-white">

          <div className="grid grid-cols-4 gap-4 bg-[#26352b] p-4 font-bold text-white">
            <span>Sản phẩm</span>
            <span>Danh mục</span>
            <span>Giá</span>
            <span>Thao tác</span>
          </div>

          {productList.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-4 items-center border-t p-4"
            >

              <span className="font-semibold">
                {product.name}
              </span>

              <span>
                {product.category}
              </span>

              <span>
                {product.price.toLocaleString("vi-VN")}đ
              </span>

              <div className="flex gap-3">

                <button onClick={() => editProduct(product)} className="rounded-lg bg-gray-200 px-3 py-2">
                  Sửa
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-lg bg-red-100 px-3 py-2 text-red-600"
                >
                  Xóa
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}