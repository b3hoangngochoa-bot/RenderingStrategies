# FocusBoard — Demo Client-side Rendering

FocusBoard là website quản lý công việc một trang được xây dựng bằng **Next.js 14 App Router**, **TypeScript** và **Tailwind CSS**. Dự án chỉ sử dụng một chiến lược rendering: **CSR (Client-side Rendering)**.

## Chức năng

- Tải danh sách công việc từ JSONPlaceholder API.
- Hiển thị loading skeleton trong khi chờ dữ liệu.
- Lọc theo tất cả, đang làm hoặc đã hoàn thành.
- Tìm kiếm công việc theo tên.
- Thêm công việc mới.
- Đánh dấu hoàn thành/chưa hoàn thành.
- Tự dùng dữ liệu mẫu khi API không phản hồi.
- Giao diện responsive trên máy tính và điện thoại.

## Cấu trúc thư mục

```text
demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout và metadata chung
│   │   ├── page.tsx        # Trang chủ (/)
│   │   └── globals.css     # CSS toàn cục
│   └── components/
│       └── TaskBoard.tsx   # Component CSR và toàn bộ tương tác
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Kiểm tra production:

```bash
npm run lint
npm run build
npm run start
```

## CSR hoạt động như thế nào?

File `src/components/TaskBoard.tsx` có dòng `"use client"`. Khi trang mở, component chạy `useEffect` ở trình duyệt để gọi API. Sau khi nhận dữ liệu, `setTodos` cập nhật state và React render lại danh sách công việc.

```tsx
"use client";

useEffect(() => {
  async function loadTodos() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTodos(data);
  }

  loadTodos();
}, []);
```

Luồng hoạt động:

```text
Mở trang → Hiện khung giao diện → useEffect gọi API
→ API trả dữ liệu → setTodos cập nhật state → Danh sách xuất hiện
```

Nguồn dữ liệu: [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
