import React, { useState } from "react";
  import api from "../api/axios";
  import { useAuth } from "../context/Auth.context";
  import { Link, useNavigate } from "react-router-dom";

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async () => {
      try {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.data.token);
        login(res.data.data.user);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <form className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md flex flex-col gap-5">

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-1">Sign in to your account</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium w-full"
            onClick={handleSubmit}
          >
            Sign In
          </button>

          <Link className="text-sm text-center text-blue-400 hover:underline" to="/register">
            Don't have an account? Register
          </Link>

        </form>
      </div>
    );
  };

  export default Login;