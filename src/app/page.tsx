async function getPost() {
  // next: { revalidate: 60 } là dấu hiệu của ISR (làm mới sau 60 giây)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', { 
    next: { revalidate: 60 } 
  });
  return res.json();
}

export default async function HomePage() {
  const post = await getPost();

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-green-600">
        Demo ISR (Revalidate 60s)
      </h1>
      <div className="border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="font-semibold text-lg capitalize">{post.title}</h2>
        <p className="mt-2 text-gray-600">{post.body}</p>
      </div>
    </div>
  );
}