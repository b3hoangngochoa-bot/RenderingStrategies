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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find(
    (item) => item.id === Number(params.id)
  );

  if (!product) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}