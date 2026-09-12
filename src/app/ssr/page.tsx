export default async function SSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    cache: "no-store",
  });
  const posts = await res.json();

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SSR - Server Side Rendering</h1>
      <p className="text-blue-600 mb-4">Render lúc: {new Date().toLocaleTimeString()}</p>
      {posts.map((p: any) => (
        <div key={p.id} className="p-4 border mb-2 rounded">
          <h2 className="font-semibold">{p.title}</h2>
          <p>{p.body}</p>
        </div>
      ))}
    </main>
  );
}