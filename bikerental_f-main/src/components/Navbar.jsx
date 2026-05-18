import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
        Rovers Hub
      </div>

      {/* Desktop Nav Links */}
      <div className="space-x-6 hidden md:flex items-center">
        <Link to="/" className="hover:text-indigo-400 transition-all duration-300">Home</Link>
        <Link to="/fleet" className="hover:text-indigo-400 transition-all duration-300">Fleet</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-all duration-300">Contact</Link>
        {isLoggedIn ? (
          <>
            <Link to="/booking" className="hover:text-indigo-400 transition-all duration-300">Booking</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-400 transition-all duration-300">Login</Link>
            <Link to="/signup" className="hover:text-indigo-400 transition-all duration-300">Signup</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Placeholder (non-functional here) */}
      <div className="md:hidden">
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}