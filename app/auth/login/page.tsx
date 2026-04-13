// "use client";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [message, setMessage] = useState("");
// const router = useRouter();

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     // const response = await axios.post("https://localhost:7183/login", {
//     //   email,
//     //   password,
//     // });

//     const response = await axios.post("https://localhost:7183/login",{
//       email,
//       password
//     })

//     if (response.status === 200) {
//       // ✅ Extract token from API response
//       const token = response.data.responseData;

//       // ✅ Save token in localStorage
//       localStorage.setItem("authToken", token);

//       setMessage("✅ Login successful!");
//       setEmail("");
//       setPassword("");
//         router.push("/menu")
//     }
//   } catch (error: any) {
//     setMessage(
//       error.response?.data?.message || "❌ Login failed. Please try again."
//     );
//   }
// };



//   return (
//     <>
//       <Navbar />
//       <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
//         <div className="bg-white shadow-lg rounded-xl p-8 w-96">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//              onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 p-3 rounded-lg"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 p-3 rounded-lg"
//               required
//             />
//            <button
//   type="submit"
//   className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800"
// >
//               Login
//             </button>
//           </form>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

// ✅ Types
type LoginResponse = {
  responseData: string;
};

type ErrorResponse = {
  message?: string;
};

type GoogleUser = {
  name: string;
  email: string;
  picture: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  // ✅ Normal Login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        "https://localhost:3000/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.responseData;
        localStorage.setItem("authToken", token);

        setMessage("✅ Login successful!");
        router.push("/menu");
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      setMessage(
        err.response?.data?.message || "❌ Login failed. Please try again."
      );
    }
  };

  // ✅ Google Login
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      const decoded = jwtDecode<GoogleUser>(
        credentialResponse.credential
      );

      const user: GoogleUser = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      console.log("Google User:", user);

      localStorage.setItem("googleUser", JSON.stringify(user));
      localStorage.setItem("authToken", credentialResponse.credential);

      setMessage("✅ Google login successful!");
      router.push("/menu");
    } catch (error) {
      setMessage("❌ Google login failed");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* 🔐 Google Login */}
          <div className="mb-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("❌ Google Login Failed")}
            />
          </div>

          <div className="text-center mb-4 text-gray-400">OR</div>

          {/* 📧 Email Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800"
            >
              Login
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">
              {message}
            </p>
          )}
        </div>
      </main>
    </>
  );
}