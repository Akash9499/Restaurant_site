"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7183/signup", {
        firstName,
        lastName,
        email,
        password,
        "userType": 0,
        "walletBalance": 0

      });

      if (response.status === 200) {
        setMessage("✅ Signup successful! You can now login.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        router.push("./auth/login")

      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "❌ Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

          {message && (
            <p className="mb-4 text-center text-sm font-medium text-green-600">
              {message}
            </p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              Signup
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
