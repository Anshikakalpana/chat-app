import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authcheck } from '../patanhi/authEv';
import { LogOut, User, Settings } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = authcheck();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/loginemail');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-white text-2xl font-bold tracking-wide hover:text-violet-200 transition-all"
          >
            ChatVerse 💬
          </Link>

      
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <Link to="/" className="hover:text-violet-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-violet-200 transition-colors">About</Link>

            {authUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 hover:text-violet-200"
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-1 hover:text-violet-200"
                >
                  <Settings size={18} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-white text-purple-700 font-semibold px-4 py-1.5 rounded-full hover:bg-violet-100 transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/loginemail"
                className="bg-white text-purple-700 font-semibold px-4 py-1.5 rounded-full hover:bg-violet-100 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-violet-200 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
