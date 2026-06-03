import React, { useState } from "react";
  import api from "../api/axios";
  import { Link, useNavigate } from "react-router-dom";
  import { useAuth } from "../context/Auth.context";

  const Register = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async () => {
      try {
        const res = await api.post("/auth/register", {
          name,
          email,
          password,
          role,
        });
        navigate("/login");
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md flex flex-col
  gap-5">

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-1">Join JobFlow today</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2
  focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">I am a...</label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2
  focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2
  focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Your Email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2
  focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button
            type="button"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium w-full"
            onClick={handleSubmit}
          >
            Create Account
          </button>

          <Link className="text-sm text-center text-blue-600 hover:underline" to="/login">
            Already have an account? Sign In
          </Link>

        </form>
      </div>
    );
  };

  export default Register;
