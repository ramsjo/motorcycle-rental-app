import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn =
    localStorage.getItem("loggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      
      {/* Top Navbar */}
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
          Rovers Hub
        </div>

        {/* Desktop Nav Links */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link
            to="/"
            className="hover:text-indigo-400 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/fleet"
            className="hover:text-indigo-400 transition-all duration-300"
          >
            Fleet
          </Link>

          <Link
            to="/contact"
            className="hover:text-indigo-400 transition-all duration-300"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/booking"
                className="hover:text-indigo-400 transition-all duration-300"
              >
                Booking
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-400 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="hover:text-indigo-400 transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden bg-gray-800 p-4 rounded-lg">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-400"
          >
            Home
          </Link>

          <Link
            to="/fleet"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-400"
          >
            Fleet
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-400"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-400"
              >
                Booking
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-400"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-400"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}