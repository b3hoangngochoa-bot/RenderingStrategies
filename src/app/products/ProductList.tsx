"use client";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductList({
  products,
}: {
  products: Product[];
}) {
  function addToCart(product: Product) {
    const oldCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing = oldCart.find(
      (item: Product & { quantity: number }) =>
        item.id === product.id
    );

    let newCart;

    if (existing) {
      newCart = oldCart.map(
        (item: Product & { quantity: number }) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
      );
    } else {
      newCart = [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-2xl border bg-white"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-5">
            <p className="text-xs font-semibold text-[#6b8f71]">
              {product.category}
            </p>

            <a
              href={`/products/${product.id}`}
              className="mt-2 block font-bold"
            >
              {product.name}
            </a>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">
                {product.price.toLocaleString("vi-VN")}đ
              </span>

              <button
                onClick={() => addToCart(product)}
                className="rounded-full bg-[#26352b] px-4 py-2 text-sm text-white"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}