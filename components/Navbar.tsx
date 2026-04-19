"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Runs only in browser
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("googleUser");
    localStorage.removeItem("authToken");
    router.push("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-amber-900 text-white px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand / Logo */}
        <h1 className="text-2xl font-bold">☕ Cakery TV</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/menu" className="hover:underline">Menu</Link>
          {!token && <Link href="/auth/login" className="hover:underline">Login</Link>}
          {token ? (
            <button onClick={handleClick} className="hover:underline">Logout</button>
          ) : (
            <Link href="/auth/signup" className="hover:underline">Signup</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-amber-800">
          <div className="flex flex-col space-y-2 pt-4">
            <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/menu" className="hover:underline" onClick={() => setIsOpen(false)}>Menu</Link>
            {!token && <Link href="/auth/login" className="hover:underline" onClick={() => setIsOpen(false)}>Login</Link>}
            {token ? (
              <button onClick={() => { handleClick(); setIsOpen(false); }} className="hover:underline text-left">Logout</button>
            ) : (
              <Link href="/auth/signup" className="hover:underline" onClick={() => setIsOpen(false)}>Signup</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
