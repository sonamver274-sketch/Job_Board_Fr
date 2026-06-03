import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 
  6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-white">JobFlow</span>
      </Link>
      <div className="flex gap-6">
         <Link className="hover:text-gray-300" to="/">Home</Link>
    <Link className="hover:text-gray-300" to="/jobs">Jobs</Link>
    {user?.role === "employer" && (
      <Link className="hover:text-gray-300" to="/dashboard">Dashboard</Link>
    )}
      </div>
      {user ? (
        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-3">
          {user?.role === "employer" && (
    <Link className="hover:text-gray-300" to="/dashboard">
      Dashboard
    </Link>
  )}
          <Link
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
