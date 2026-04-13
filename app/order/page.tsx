import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderPage() {

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
        <h1 className="text-4xl font-bold mb-4">Place an Order</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
         Order page
        </p>
      </main>
      <Footer />
    </>
  );
}
