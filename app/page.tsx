import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-amber-50 min-h-screen">
        {/* 🌟 Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-900 mb-4">
            Welcome to My Bakery 🥐 Cakery TV
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl">
            Freshly baked breads, pastries, and desserts made with love every
            morning. Experience warmth, flavor, and happiness in every bite.
          </p>
        </section>

        {/* 🧁 Bakery Items */}
        <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {bakeryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center 
                         transform transition duration-500 hover:-translate-y-3 
                         animate-float"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
                className="rounded-xl mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-amber-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

/* 🍰 Bakery Data */
const bakeryItems = [
  {
    title: "Chocolate Croissant",
    description: "Buttery, flaky croissant filled with rich dark chocolate.",
    image: "/images/Cake1.webp",
  },
  {
    title: "Fresh Bread Loaf",
    description: "Soft inside, crispy outside — baked fresh every morning.",
    image: "/images/Cake2.webp",
  },
  {
    title: "Cupcakes",
    description: "Colorful cupcakes topped with creamy frosting.",
    image: "/images/Cake3.webp",
  },
  {
    title: "Donuts",
    description: "Perfectly glazed donuts with a soft, fluffy center.",
    image: "/images/Cake4.webp",
  },
  {
    title: "Cheesecake",
    description: "Classic baked cheesecake with a smooth, creamy texture.",
    image: "/images/Cake5.webp",
  },
  {
    title: "Coffee & Pastry",
    description: "The perfect combo to start your day right.",
    image: "/images/Cake6.webp",
  },
];

