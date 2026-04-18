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
    description: string;
    image: string;
  };

  type CartItem = MenuItem & {
    quantity: number;
  };

  const [menu] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Espresso",
      price: 120,
      description: "Rich and bold single shot espresso",
      image: "/images/Cake1.webp"
    },
    {
      id: "2",
      name: "Cappuccino",
      price: 180,
      description: "Classic cappuccino with steamed milk foam",
      image: "/images/Cake2.webp"
    },
    {
      id: "3",
      name: "Latte",
      price: 200,
      description: "Smooth latte with creamy steamed milk",
      image: "/images/Cake3.webp"
    },
    {
      id: "4",
      name: "Americano",
      price: 150,
      description: "Espresso diluted with hot water",
      image: "/images/Cake4.webp"
    },
    {
      id: "5",
      name: "Croissant",
      price: 80,
      description: "Fresh buttery croissant",
      image: "/images/Cake5.webp"
    },
    {
      id: "6",
      name: "Blueberry Muffin",
      price: 100,
      description: "Moist muffin with fresh blueberries",
      image: "/images/Cake6.webp"
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setLoading(false);
  }, [router]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart =>
      prevCart.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[])
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart first!");
      return;
    }
    // Here you would typically send the order to your backend
    alert(`Order placed successfully! Total: ₹${getTotalPrice()}`);
    setCart([]);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading menu...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">☕ Café Menu</h1>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">🛒 Your Cart</h2>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <div className="flex items-center gap-2">
                      <span>₹{item.price * item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total: ₹{getTotalPrice()}</span>
                    <button
                      onClick={placeOrder}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-xl p-6 text-center transform transition duration-300 hover:-translate-y-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-amber-800">₹{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
