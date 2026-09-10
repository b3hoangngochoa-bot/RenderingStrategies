type About = {
  title: string;
  description: string;
};

async function getAbout(): Promise<About> {
  const response = await fetch("http://localhost:3000/api/about", {
    cache: "force-cache",
  });

  return response.json();
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <main className="min-h-screen bg-[#f8f7f2] pt-24 px-5 pb-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold">
          {about.title}
        </h1>

        <p className="mt-3 text-gray-600">
          {about.description}
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="bg-white rounded-2xl p-6 border">
            <h2 className="text-xl font-bold">
              🐾 Chúng tôi là ai?
            </h2>

            <p className="mt-3 text-gray-600 leading-7">
              Chúng tôi mong muốn mang đến những sản phẩm
              phù hợp cho chó mèo, giúp việc chăm sóc thú cưng
              trở nên dễ dàng và vui vẻ hơn.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h2 className="text-xl font-bold">
              ❤️ Điều chúng tôi hướng đến
            </h2>

            <p className="mt-3 text-gray-600 leading-7">
              Chất lượng sản phẩm, sự tiện lợi và trải nghiệm
              thân thiện là những điều mà Tiệm Chó Mèo Vui Vẻ
              luôn hướng đến.
            </p>
          </div>

        </section>

        <section className="mt-6 bg-[#26352b] text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Vì thú cưng xứng đáng được yêu thương
          </h2>

          <p className="mt-3 leading-7">
            Từ thức ăn, đồ chơi đến các sản phẩm chăm sóc,
            chúng tôi muốn trở thành một lựa chọn quen thuộc
            cho những người yêu thú cưng.
          </p>
        </section>

      </div>
    </main>
  );
}