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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setLoading(false);

    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobileDevice(mobileRegex.test(navigator.userAgent));
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

  const openOrderModal = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart first!");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getOrderSummary = () => {
    return cart
      .map(item => `${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
      .join("\n");
  };

  const getMessageBody = () => {
    return `Order from ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}\n\nItems:\n${getOrderSummary()}\n\nTotal: ₹${getTotalPrice()}\n\nYour order details are sending to the shop. They will revert you on order confirmation.`;
  };

  const openWhatsappOrSms = (message: string) => {
    const whatsappUrl = `whatsapp://send?phone=+919260928528&text=${encodeURIComponent(message)}`;
    const smsUrl = `sms:9260928528?body=${encodeURIComponent(message)}`;

    const fallbackTimeout = window.setTimeout(() => {
      window.location.href = smsUrl;
    }, 1500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        window.clearTimeout(fallbackTimeout);
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.href = whatsappUrl;

    setTimeout(() => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    }, 2000);
  };

  const submitOrder = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert("Please fill in your name, contact number, and address.");
      return;
    }

    const message = getMessageBody();

    if (isMobileDevice) {
      openWhatsappOrSms(message);
    } else {
      const mailtoUrl = `mailto:smrtakashkp@gmail.com?subject=${encodeURIComponent("New Order from Cakery TV")}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;
    }

    setIsModalOpen(false);
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
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
                  <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
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
                <div className="border-t pt-4 mt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 font-bold">
                    <span>Total: ₹{getTotalPrice()}</span>
                    <button
                      onClick={openOrderModal}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
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
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-2xl font-bold text-amber-800">₹{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition duration-200 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-amber-900 text-white px-6 py-5">
              <h2 className="text-2xl font-semibold">Confirm Your Order</h2>
              <p className="mt-2 text-sm text-amber-100">
                Enter your details and send the order to the shop. They will revert you on confirmation.
              </p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
                  placeholder="9260928528"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={customerAddress}
                  onChange={e => setCustomerAddress(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
                  placeholder="Your delivery address"
                  rows={4}
                />
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-100">
                <h3 className="text-lg font-semibold mb-2">Order details sending to shop</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isMobileDevice
                    ? "This device will try WhatsApp first and fall back to SMS if WhatsApp is unavailable."
                    : "This device will send the order via email to smrtakashkp@gmail.com."}
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  {cart.map(item => (
                    <p key={item.id}>
                      {item.name} x{item.quantity} — ₹{item.price * item.quantity}
                    </p>
                  ))}
                </div>
                <div className="pt-3 text-sm font-semibold text-amber-900">Total: ₹{getTotalPrice()}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={submitOrder}
                  className="w-full bg-amber-600 text-white px-5 py-3 rounded-xl hover:bg-amber-700 transition"
                >
                  Send Order
                </button>
                <button
                  onClick={closeModal}
                  className="w-full border border-gray-300 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
