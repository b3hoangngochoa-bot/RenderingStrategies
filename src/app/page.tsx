import ShoeStoreClient, { Shoe } from "./ShoeStoreClient";

async function getShoeData(): Promise<Shoe[]> {
  const mockShoes: Shoe[] = [
    { id: 1, name: "Nike Air Zoom Pegasus", price: 3500000, category: "running", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 2, name: "Adidas Ultraboost Light", price: 4200000, category: "running", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
    { id: 3, name: "Air Jordan 1 Low", price: 3800000, category: "basketball", image: "https://images.unsplash.com/photo-1597248881519-db089d3744a4?w=500" },
    { id: 4, name: "Puma Suede Classic", price: 2100000, category: "sneaker", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500" },
    { id: 5, name: "New Balance 550", price: 3200000, category: "sneaker", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500" },
    { id: 6, name: "Nike Lebron XX", price: 4900000, category: "basketball", image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500" },
  ];

  return mockShoes;
}

export default async function HomePage() {
  const shoes = await getShoeData();
  return <ShoeStoreClient initialShoes={shoes} />;
}