export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    cache: "force-cache",
  });
  const posts = await res.json();

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SSG - Static Site Generation</h1>
      <p className="text-green-600 mb-4">Build lúc: {new Date().toLocaleTimeString()}</p>
      {posts.map((p: any) => (
        <div key={p.id} className="p-4 border mb-2 rounded">
          <h2 className="font-semibold">{p.title}</h2>
          <p>{p.body}</p>
        </div>
      ))}
    </main>
  );
}