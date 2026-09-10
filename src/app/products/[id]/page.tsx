type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `http://localhost:3000/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  return response.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="min-h-screen bg-[#f8f7f2] pt-24 px-5 pb-10">
      <div className="max-w-5xl mx-auto">

        <a
          href="/products"
          className="text-[#6b8f71]"
        >
          ← Quay lại sản phẩm
        </a>

        <div className="mt-6 grid gap-8 md:grid-cols-2 bg-white rounded-2xl p-6">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl"
          />

          <div>
            <p className="text-sm font-semibold text-[#6b8f71]">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-bold">
              {product.price.toLocaleString("vi-VN")}đ
            </p>

            <p className="mt-5 text-gray-600 leading-7">
              Sản phẩm chất lượng dành cho thú cưng,
              phù hợp với nhu cầu chăm sóc hằng ngày.
            </p>

            <button className="mt-6 rounded-full bg-[#26352b] px-6 py-3 text-white">
              Thêm vào giỏ hàng
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}