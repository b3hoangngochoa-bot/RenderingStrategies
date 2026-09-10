import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Về chúng tôi",
    description:
      "Tiệm Chó Mèo Vui Vẻ là nơi cung cấp những sản phẩm đơn giản và tiện lợi dành cho thú cưng.",
  });
}