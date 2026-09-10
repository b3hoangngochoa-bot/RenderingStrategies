import LikeButton from "../components/LikeButton";

export default async function HomePage() {
  // SSR: Giữ lại lệnh fetch với 'no-store' để đáp ứng yêu cầu kỹ thuật của bài tập (buộc Next.js phải render lại trang ở mỗi request).
  await fetch("https://jsonplaceholder.typicode.com/posts?_limit=1", {
    cache: "no-store", 
  });

  // Dữ liệu nội dung tùy chỉnh thay cho tiếng Latin
  const customProjects = [
    {
      id: 1,
      title: "Thiết Kế Môi Trường 3D Cinematic",
      body: "Xây dựng bối cảnh game AAA với hệ thống ánh sáng thời gian thực. Ứng dụng tư duy thiết kế không gian và kết hợp xử lý kỹ xảo hậu kỳ bằng After Effects để tối ưu hóa hiệu ứng thị giác chuẩn điện ảnh."
    },
    {
      id: 2,
      title: "Tích Hợp AI Nhận Diện Chuyển Động",
      body: "Triển khai hệ thống Computer Vision sử dụng Python và OpenCV để phát hiện vật thể và theo dõi chuyển động, tạo tiền đề cho các cơ chế tương tác thông minh của NPC trong môi trường game."
    },
    {
      id: 3,
      title: "Xử Lý Âm Thanh Không Gian (Spatial Audio)",
      body: "Thiết kế âm thanh môi trường với quy trình kỹ thuật tuần tự khép kín: xử lý khử tiếng vang (dereverberation), hạ tông (lower pitch), chuyển đổi định dạng âm thanh sang mono và cuối cùng là loại bỏ nhiễu (distortion)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
          Concept Đồ Họa Cinematic & Game AAA (SSR)
        </h1>
        <div className="space-y-6">
          {customProjects.map((project) => (
            <div key={project.id} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-indigo-400 capitalize mb-3">
                {project.title}
              </h2>
              <p className="text-slate-400 leading-relaxed">{project.body}</p>
              
              <LikeButton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}