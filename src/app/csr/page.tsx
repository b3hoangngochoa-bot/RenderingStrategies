"use client";
import { useEffect, useState } from "react";

export default function CSRPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSR - Client Side Rendering</h1>
      {posts.map((p) => (
        <div key={p.id} className="p-4 border mb-2 rounded">
          <h2 className="font-semibold">{p.title}</h2>
          <p>{p.body}</p>
        </div>
      ))}
    </main>
  );
}