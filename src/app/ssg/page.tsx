export default async function SSGPage() {
  // cache: 'force-cache' nghĩa là LƯU TRỮ CHẾT. Chỉ lấy dữ liệu 1 lần duy nhất lúc build.
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2', {
    cache: 'force-cache',
  });
  const data = await res.json();
  
  // Lấy thời gian thực của Server
  const time = new Date().toLocaleTimeString('vi-VN');

  return (
    <div className="p-6 bg-slate-800 rounded-xl border-l-4 border-purple-400">
      <h1 className="text-2xl font-bold text-purple-400 mb-2">Static Site Generation (SSG)</h1>
      <p className="mb-4 text-slate-300">Trang được "đóng băng" thành HTML tĩnh. Rất nhanh nhưng dữ liệu không cập nhật.</p>
      
      <div className="mb-6 inline-block bg-purple-950 text-purple-200 px-4 py-2 rounded font-mono">
         Thời gian trang bị đóng băng: <strong>{time}</strong>
        <br/>
        <span className="text-sm italic">(F5 thoải mái, thời gian này SẼ KHÔNG BAO GIỜ thay đổi)</span>
      </div>
    </div>
  );
}