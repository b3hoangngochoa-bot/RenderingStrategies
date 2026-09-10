"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className={`mt-4 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
        liked 
          ? "bg-rose-500 text-white shadow-md shadow-rose-500/30" 
          : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600"
      }`}
    >
      {liked ? "❤️ Đã lưu vào thư viện" : "🤍 Thêm vào thư viện"}
    </button>
  );
}