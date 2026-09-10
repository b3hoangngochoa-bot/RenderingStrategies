"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const users: User[] = [
  { id: 1, name: "Nguyễn Văn A", email: "vana@gmail.com", phone: "0912 345 678", website: "vana.id.vn" },
  { id: 2, name: "Trần Thị B", email: "thib@gmail.com", phone: "0987 654 321", website: "thib.id.vn" },
  { id: 3, name: "Lê Văn C", email: "vanc.le@gmail.com", phone: "0901 234 567", website: "levanc.id.vn" },
  { id: 4, name: "Phạm Thị D", email: "thid.pham@gmail.com", phone: "0933 111 222", website: "phamthid.id.vn" },
  { id: 5, name: "Hoàng Văn E", email: "vane.hoang@gmail.com", phone: "0977 888 999", website: "hoangvane.id.vn" },
  { id: 6, name: "Đặng Thị F", email: "thif.dang@gmail.com", phone: "0966 555 444", website: "dangthif.id.vn" },
];

export default function ClientView() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(users);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-black/[.05] dark:bg-white/[.06]">
          CSR (Client-Side Rendering)
        </span>
        <h1 className="text-xl font-bold mt-2">Danh sách người dùng</h1>
        <p className="text-xs text-neutral-500 mt-1">Fetch and rendered on browser</p>
      </div>

      {loading ? (
        <div className="text-sm text-neutral-500">Đang tải dữ liệu...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg border border-black/[.08] dark:border-white/[.145]"
            >
              <h2 className="font-semibold text-base">{user.name}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Email: {user.email}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Phone: {user.phone}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Website: {user.website}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}