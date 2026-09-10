import { NextResponse } from "next/server";

let products = [
  {
    id: 1,
    name: "Hạt cho chó",
    category: "Chó",
    price: 150000,
    image: "/img/Dogfood.webp",
  },
  {
    id: 2,
    name: "Pate cho mèo",
    category: "Mèo",
    price: 90000,
    image: "/img/Catfood.webp",
  },
  {
    id: 3,
    name: "Xương cao su",
    category: "Đồ chơi",
    price: 120000,
    image: "/img/Bone.webp",
  },
  {
    id: 4,
    name: "Sữa tắm chó mèo",
    category: "Chăm sóc",
    price: 34990,
    image: "/img/Shampoo.webp",
  },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();

  const newProduct = {
    ...product,
    id: Date.now(),
  };

  products.push(newProduct);

  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  const updatedProduct = await request.json();

  products = products.map((product) =>
    product.id === updatedProduct.id
      ? updatedProduct
      : product
  );

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  products = products.filter((product) => product.id !== id);

  return NextResponse.json({ message: "Đã xóa sản phẩm" });
}