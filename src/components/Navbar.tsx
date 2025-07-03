import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isHomeRoute = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${
      isScrolled || !isHomeRoute ? 'bg-black' : 'bg-gradient-to-b from-black/75 to-transparent'
    }`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <svg viewBox="0 0 111 30" className="h-[25px] w-[92px] text-netflix-red fill-current">
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </svg>
            </Link>
            
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/browse" className="text-sm text-gray-200 hover:text-white">
                  Home
                </Link>
                <Link to="/browse?category=tv" className="text-sm text-gray-200 hover:text-white">
                  TV Shows
                </Link>
                <Link to="/browse?category=movies" className="text-sm text-gray-200 hover:text-white">
                  Movies
                </Link>
                <Link to="/browse?category=new" className="text-sm text-gray-200 hover:text-white">
                  New & Popular
                </Link>
                <Link to="/browse?category=my-list" className="text-sm text-gray-200 hover:text-white">
                  My List
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button className="text-white p-2 hover:text-gray-300">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-white p-2 hover:text-gray-300">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <img
                      src="https://occ-0-2186-64.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
                      alt="Profile"
                      className="w-8 h-8 rounded"
                    />
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-700 rounded-md shadow-lg">
                      <div className="py-1">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                          Manage Profiles
                        </Link>
                        <Link to="/account" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                          Account
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-netflix-red hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;