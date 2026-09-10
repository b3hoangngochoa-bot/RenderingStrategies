export default async function ISRPage() {
  // revalidate: 10 nghĩa là: Đóng băng trang này lại. Nhưng cứ sau 10 giây, nếu có người vào xem, hãy tạo lại bản đóng băng mới.
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2', {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  
  // Lấy thời gian thực của Server
  const time = new Date().toLocaleTimeString('vi-VN');

  return (
    <div className="p-6 bg-slate-800 rounded-xl border-l-4 border-rose-400">
      <h1 className="text-2xl font-bold text-rose-400 mb-2">Incremental Static Regeneration (ISR)</h1>
      <p className="mb-4 text-slate-300">Trang tĩnh nhưng tự động làm mới sau mỗi 10 giây.</p>
      
      <div className="mb-6 inline-block bg-rose-950 text-rose-200 px-4 py-2 rounded font-mono">
         Thời gian bản tĩnh gần nhất: <strong>{time}</strong>
        <br/>
        <span className="text-sm italic">(Ấn F5 liên tục thời gian sẽ đứng im. Đợi 10 giây sau ấn F5 lại, nó sẽ cập nhật)</span>
      </div>
    </div>
  );
}