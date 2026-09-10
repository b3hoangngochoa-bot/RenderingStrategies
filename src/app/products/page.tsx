import ProductList from "./ProductList";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products", {
    next: {
      revalidate: 10,
    },
  });

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f8f7f2] pt-24 px-5 pb-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold">
          Sản phẩm
        </h1>

        <p className="mt-2 text-gray-600">
          Những sản phẩm dành cho thú cưng của bạn
        </p>

        <ProductList products={products} />

      </div>
    </main>
  );
}