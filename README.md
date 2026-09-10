# 🚀 Next.js 14 – Demo Rendering Strategies (SSR & ISR)

Bài tập **Next.js 14 App Router** + **TypeScript** + **Tailwind CSS**, chủ đề Quotes.

Dự án demo **2** kiểu rendering: **SSR** và **ISR**. Next.js 14 hỗ trợ 4 kiểu
(CSR, SSR, SSG, ISR); đề bài yêu cầu vận dụng ít nhất 1, bài này làm 2.

---

## 📋 Yêu cầu môi trường

| Công cụ | Phiên bản tối thiểu | Kiểm tra |
|---------|-------------------|----------|
| **Node.js** | ≥ 18.17 | `node -v` |
| **npm** | ≥ 9 | `npm -v` |
| **Git** | bất kỳ | `git --version` |

> 💡 Tải Node.js tại: https://nodejs.org (chọn bản **LTS**)

---

## ⚡ Cài đặt & Chạy

### 1. Clone repository

```bash
git clone <URL-repo>
```

### 2. Vào thư mục project

```bash
cd WebDev_RenderingStrategies
```

### 3. Cài dependencies

```bash
npm install
```

### 4. Chạy development server

```bash
npm run dev
```

### 5. Mở trình duyệt

```
http://localhost:3000
```

Server **tự reload** mỗi khi lưu file.

---

## 📁 Cấu trúc thư mục

```
WebDev_RenderingStrategies/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout chung + nạp font Geist (next/font/local)
│   │   ├── globals.css         # Tailwind directives
│   │   ├── page.tsx            # Trang chủ (/) — 2 card dẫn vào /ssr và /isr
│   │   ├── fonts/              # GeistVF.woff, GeistMonoVF.woff
│   │   ├── ssr/
│   │   │   ├── page.tsx        # Route SSR
│   │   │   └── loading.tsx     # Suspense fallback khi server đang fetch
│   │   └── isr/
│   │       └── page.tsx        # Route ISR (revalidate 20s)
│   ├── components/
│   │   ├── Navbar.tsx          # Server component
│   │   ├── QuoteCard.tsx       # Server component, presentational
│   │   └── RenderInfo.tsx      # Client component ("use client") — badge chẩn đoán
│   ├── lib/
│   │   └── quotes.ts           # Data layer: fetch + fallback + constant dùng chung
│   └── types/
│       └── quote.ts            # Interface Quote
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🧩 Hai kiểu rendering trong bài

| Route | Kiểu | Cấu hình | Kết quả `next build` |
|-------|------|----------|----------------------|
| `/ssr` | **SSR** | `fetch(..., { cache: "no-store" })` | `ƒ (Dynamic)` |
| `/isr` | **ISR** | `fetch(..., { next: { revalidate: 20 } })` + `export const revalidate = 20` | `○ (Static)` |

> Riêng `cache: "no-store"` đã đủ buộc route render động mỗi request, nên `/ssr`
> **không** cần thêm `export const dynamic = "force-dynamic"`.

### Nguồn cấu hình tập trung

URL API, số giây revalidate và **chuỗi code hiển thị trên UI** đều nằm trong
`src/lib/quotes.ts`:

```ts
const API_RANDOM_1 = "https://dummyjson.com/quotes/random";
const API_RANDOM_3 = "https://dummyjson.com/quotes/random/3";

export const REVALIDATE_SECONDS = 20;

export const SSR_FETCH_CODE = `fetch("${API_RANDOM_1}", { cache: "no-store" })`;
export const ISR_FETCH_CODE = `fetch("${API_RANDOM_3}", { next: { revalidate: ${REVALIDATE_SECONDS} } })`;
```

Badge `RenderInfo` hiển thị `SSR_FETCH_CODE` / `ISR_FETCH_CODE`, nên đoạn code
người đọc thấy trên trang **luôn khớp** với fetch thật. Đổi URL hay đổi số giây
chỉ cần sửa một chỗ.

> ⚠️ Ngoại lệ: `export const revalidate` trong `src/app/isr/page.tsx` phải là
> **literal** (`20`) vì Next.js static-analysis route segment config, không nhận
> giá trị import. Sửa `REVALIDATE_SECONDS` thì sửa luôn chỗ này.

### Chống treo & chống chết

- Mọi fetch có `AbortSignal.timeout(8000)`.
- API lỗi → fallback về `FALLBACK_QUOTES` (8 quote hardcode) + `console.warn`, trang vẫn render.

---

## 📝 Bảng tham khảo 4 kiểu rendering của Next.js 14

| Kiểu | Mô tả ngắn | Cách dùng | Bài này |
|------|-----------|-----------|---------|
| **CSR** | Render trên trình duyệt | `"use client"` + `useEffect` | một phần (badge `RenderInfo`) |
| **SSR** | Render trên server mỗi request | `fetch(..., { cache: "no-store" })` | ✅ `/ssr` |
| **SSG** | Render lúc build, tĩnh hoàn toàn | `fetch(..., { cache: "force-cache" })` | ❌ |
| **ISR** | Tĩnh nhưng tự làm mới theo chu kỳ | `fetch(..., { next: { revalidate: 60 } })` | ✅ `/isr` |

> Tham khảo: [Next.js Rendering Docs](https://nextjs.org/docs/app/building-your-application/rendering)

---

## 🔬 Cách tự kiểm chứng

**SSR** — vào `/ssr`, bấm F5 liên tục: giờ render và quote đổi **ngay lập tức** mỗi lần.

**ISR** — vào `/isr`:
- Trong 20s đầu: F5 liên tục, dữ liệu **giữ nguyên** (đọc từ cache).
- Quá 20s: badge báo `ĐÃ HẾT HẠN`.
  - **F5 lần 1**: vẫn trả cache cũ, nhưng Next.js âm thầm gọi API ở nền (stale-while-revalidate).
  - **F5 lần 2** (sau 1-2s): thấy quote mới + giờ render mới.

---

## ❓ Xử lý lỗi thường gặp

**Lỗi `Cannot find module` hoặc lỗi sau khi clone** (PowerShell):

```powershell
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run dev
```

Bản cmd.exe:

```cmd
rmdir /s /q .next node_modules && npm install && npm run dev
```

**Port 3000 đã bị chiếm:**

```bash
npm run dev -- -p 3001
```

**`git status` báo `fatal: .git/index: index file smaller than expected`:**
index hỏng (thường do máy tắt đột ngột). Index là dữ liệu dẫn xuất, rebuild
từ HEAD được, **không mất commit hay file**:

```powershell
Remove-Item .git\index -Force
git reset
git status
```

**`npm` không nhận lệnh:** cài lại Node.js từ https://nodejs.org rồi mở lại terminal.
