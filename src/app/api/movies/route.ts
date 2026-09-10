import { NextResponse } from "next/server";

export async function GET() {
  const movies = [
    {
      id: 1,
      title: "Watch Party: GEN vs T1",
      year: 2026,
      image:
        "https://cdn-img.thethao247.vn/origin_842x0/storage/files/kythanhgaming1/2025/10/01/t1-68dd09cf75720.jpg",
    },
    {
      id: 2,
      title: "Nghỉ Hè Sợ Nghỉ Hưu",
      year: 2026,
      image:
        "https://icdn.24h.com.vn/upload/3-2026/images/2026-09-03/1788416776-6d189d79b4-nghi-he-so-nghi-huu-48806-width640height529.jpg",
    },
    {
      id: 3,
      title: "Lên Hương",
      year: 2026,
      image:
        "https://thegioidienanh.vn/stores/news_dataimages/2026/072026/30/15/anh-tam20260730153009.jpg?rt=20260730153815",
    },
  ];

  return NextResponse.json(movies);
}