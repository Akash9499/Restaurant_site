import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl text-center">
          contact us page
        </p>
      </main>
      <Footer />
    </>
  );
}
