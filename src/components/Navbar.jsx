import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold">JobFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link className="hover:text-gray-300" to="/">Home</Link>
          <Link className="hover:text-gray-300" to="/jobs">Jobs</Link>
          {user?.role === "employer" && (
            <Link className="hover:text-gray-300" to="/dashboard">Dashboard</Link>
          )}
          {user?.role === "jobSeeker" && (
            <Link className="hover:text-gray-300" to="/my-applications">My Applications</Link>
          )}
          {user ? (
            <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800" to="/login">Login</Link>
              <Link className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800" to="/register">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-3 pb-3 border-t border-gray-700 pt-3">
          <Link className="hover:text-gray-300" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="hover:text-gray-300" to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          {user?.role === "employer" && (
            <Link className="hover:text-gray-300" to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          )}
          {user?.role === "jobSeeker" && (
            <Link className="hover:text-gray-300" to="/my-applications" onClick={() => setMenuOpen(false)}>My Applications</Link>
          )}
          {user ? (
            <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-left" onClick={() => { logout(); setMenuOpen(false); }}>
              Logout
            </button>
          ) : (
            <>
              <Link className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 text-center" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 text-center" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
