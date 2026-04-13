"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [token, setToken] = useState<string | null>(null);
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

  return (
    <nav className="bg-amber-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Brand / Logo */}
      <h1 className="text-2xl font-bold">☕ My Café</h1>

      {/* Links */}
      <div className="space-x-6">
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
    </nav>
  );
}
