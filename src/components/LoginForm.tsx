import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="bg-orange-200 w-full md:w-1/2 flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Transform Your Style with AI.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        Upload your outfit inspiration and let our AI recommend the perfect styles for you. Shopping for fashion has never been smarter!
        </p>
        <img
          src="/login.png"
          alt="E-commerce illustration"
          className="w-7/8 object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">Welcome Back</h2>
          <p className="text-gray-500">Please login to your account</p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-gray-50 p-6 rounded shadow-lg space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex justify-between items-center w-full max-w-md">
          <p
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Don't have an account? Signup
          </p>
          <p className="text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
