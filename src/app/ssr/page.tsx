export default async function SSRPage() {
  // cache: 'no-store' nghĩa là KHÔNG LƯU TRỮ. Request nào cũng phải làm mới.
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2', {
    cache: 'no-store',
  });
  const data = await res.json();
  
  // Lấy thời gian thực của Server lúc render
  const time = new Date().toLocaleTimeString('vi-VN');

  return (
    <div className="p-6 bg-slate-800 rounded-xl border-l-4 border-emerald-400">
      <h1 className="text-2xl font-bold text-emerald-400 mb-2">Server-Side Rendering (SSR)</h1>
      <p className="mb-4 text-slate-300">Server lấy dữ liệu MỚI HOÀN TOÀN cho mỗi lần bạn F5.</p>
      
      <div className="mb-6 inline-block bg-emerald-950 text-emerald-200 px-4 py-2 rounded font-mono">
         Thời gian Server tạo trang này: <strong>{time}</strong>
        <br/>
        <span className="text-sm italic">(Hãy thử ấn F5, bạn sẽ thấy thời gian này thay đổi ngay)</span>
      </div>
    </div>
  );
}