"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MenuPage() {
type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const token = window.localStorage.getItem("authToken"); // 👈 JWT stored after login
    if (!token) {
      router.push("/auth/login"); // redirect if not logged in
      return;
    }
  }, [router]);

//   if (loading) {
//     return <p className="text-center mt-10">Loading menu...</p>;
//   }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">☕ Café Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 text-center"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-amber-800 font-bold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
