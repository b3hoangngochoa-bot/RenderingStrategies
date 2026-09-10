"use client";

import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  year: number;
  image: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        // Gọi API để lấy dữ liệu phim
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu phim");
        }

        const data: Movie[] = await response.json();

        // Lưu dữ liệu nhận được vào state
        setMovies(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      } finally {
        // Tắt trạng thái loading
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">
        🍿 CGV THẢO ĐIỀN
      </h1>

      <p className="mb-8 text-center text-gray-500">
        Client Side Rendering (CSR) with Next.js
      </p>

      {loading ? (
        <p className="text-center text-xl">
          Đang tải dữ liệu phim...
        </p>
      ) : (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {movie.title}
                </h2>

                <p className="mt-2 text-gray-400">
                  Năm phát hành: {movie.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}