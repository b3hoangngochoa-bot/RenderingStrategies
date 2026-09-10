import React from 'react';

// 1. Hàm gọi API lấy dữ liệu sử dụng SSR (Server-Side Rendering)
async function getServices() {
  // Vẫn gọi API để đáp ứng đúng yêu cầu fetch + cache: 'no-store' của đề bài
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Không thể tải dữ liệu dịch vụ');
  }
  
  const apiData = await res.json();

  // Tạo bộ dữ liệu tiếng Việt thực tế cho mô hình Hair Salon
  const vietnameseServices = [
    { title: "Cắt Tóc Nam Tiêu Chuẩn", body: "Tư vấn kiểu tóc phù hợp khuôn mặt, cắt, gội, vuốt sáp tạo kiểu chuyên nghiệp từ các stylist hàng đầu." },
    { title: "Uốn Phồng Trẻ Trung", body: "Uốn phồng chân tóc, uốn xoăn nhẹ phong cách Hàn Quốc, giữ nếp lâu dài và dễ dàng tự chăm sóc tại nhà." },
    { title: "Nhuộm Màu Thời Trang", body: "Trải nghiệm các tông màu hot trend. Sử dụng thuốc nhuộm cao cấp, bền màu và không gây hư tổn cho tóc." },
    { title: "Phục Hồi Tóc Chuyên Sâu", body: "Liệu trình hấp phục hồi với keratin và collagen giúp lấy lại độ bóng mượt, chắc khỏe cho mái tóc xơ rối." },
    { title: "Gội Đầu Dưỡng Sinh", body: "Gội đầu thảo dược kết hợp massage ấn huyệt cổ vai gáy giúp thư giãn tinh thần, xua tan mệt mỏi." },
    { title: "Combo Chăm Sóc Da Mặt", body: "Dịch vụ cạo râu, tỉa lông mày an toàn kết hợp đắp mặt nạ, chườm khăn nóng thư giãn tuyệt đối." }
  ];

  // Trộn dữ liệu tiếng Việt vào cấu trúc của API trả về
  return apiData.map((item: any, index: number) => ({
    ...item,
    title: vietnameseServices[index]?.title || item.title,
    body: vietnameseServices[index]?.body || item.body
  }));
}

// 2. Component chính hiển thị giao diện
export default async function Home() {
  const services = await getServices();

  return (
    <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <header className="border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">Hệ Thống Đặt Lịch Cắt Tóc</h1>
          <div className="inline-block bg-black text-white text-sm px-3 py-1 rounded-full">
            Chiến lược Rendering: SSR (cache: no-store)
          </div>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-6">Danh sách dịch vụ nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <div 
                key={service.id} 
                className="border border-black/[.08] dark:border-white/[.145] p-6 rounded-xl hover:shadow-lg transition-shadow flex flex-col justify-between bg-white"
              >
                <div>
                  <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {service.body}
                  </p>
                </div>
                <button className="w-full rounded-full bg-black text-white hover:bg-gray-800 h-10 text-sm font-medium transition-colors">
                  Đặt lịch ngay
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}