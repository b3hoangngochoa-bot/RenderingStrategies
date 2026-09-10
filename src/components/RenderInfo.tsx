"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RenderInfoProps {
  strategy: "SSR" | "ISR";
  renderTime: string;
  revalidate?: number;
  code: string;
}

export default function RenderInfo({
  strategy,
  renderTime,
  revalidate,
  code,
}: RenderInfoProps) {
  const router = useRouter();
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const start = new Date(renderTime).getTime();
    const update = () => {
      setSecondsAgo(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [renderTime]);

  const formattedTime = new Date(renderTime).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const isExpired = revalidate ? secondsAgo >= revalidate : false;

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{strategy}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">
            {strategy === "SSR" ? 'cache: "no-store"' : `revalidate: ${revalidate}s`}
          </span>
        </div>
        <button
          onClick={() => router.refresh()}
          className="text-xs border border-gray-300 hover:bg-gray-100 text-gray-700 px-2.5 py-1 rounded transition-colors"
        >
          Tải lại (F5 / Refresh)
        </button>
      </div>

      <div className="text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
        <div>
          Server render lúc:{" "}
          <span className="font-mono font-semibold text-gray-900">{formattedTime}</span>
        </div>
        <div>
          Đã tạo cách đây:{" "}
          <span className="font-mono font-semibold text-gray-900">{secondsAgo}s</span>
        </div>
        {strategy === "ISR" && revalidate && (
          <div>
            Trạng thái:{" "}
            {isExpired ? (
              <span className="text-amber-600 font-semibold font-mono">
                ĐÃ HẾT HẠN (F5 lần 1 để revalidate ngầm, F5 lần 2 để thấy mới)
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold font-mono">
                ĐANG LẤY TỪ CACHE ({revalidate - secondsAgo}s nữa)
              </span>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-gray-100 text-xs font-mono p-2 rounded overflow-x-auto">
        <code>{code}</code>
      </div>

      <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 p-2.5 rounded">
        {strategy === "SSR" ? (
          <p>
            <strong>Mỗi lần F5:</strong> Server chạy lại mã và cập nhật giờ + quote mới lập tức.
          </p>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold text-gray-800">
              Cơ chế Stale-While-Revalidate của Next.js ISR:
            </p>
            <p>
              • <strong>Trong vòng {revalidate}s:</strong> F5 liên tục dữ liệu vẫn giữ nguyên vì lấy từ file cache.
            </p>
            <p>
              • <strong>Khi đã quá {revalidate}s:</strong>
              <br />
              - Bấm <strong>F5 lần 1</strong>: Next.js vẫn trả cache cũ cho bạn ngay, nhưng âm thầm gọi API cập nhật ở nền.
              <br />
              - Bấm <strong>F5 lần 2</strong> (sau 1-2s): Bạn sẽ thấy quote mới và giờ render mới xuất hiện!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
