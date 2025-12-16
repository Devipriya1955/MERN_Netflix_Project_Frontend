import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaCaretDown, FaGift } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SearchResults from './SearchResults';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userList, setUserList] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const closeSearch = () => {
    setShowSearchResults(false);
    setSearchQuery('');
    setShowSearch(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 lg:px-16 py-4">
        <div className="flex items-center space-x-8">
          <Link to="/browse">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix" 
              className="h-6 lg:h-7"
            />
          </Link>
          <MobileMenu />
          {user && (
            <div className="hidden lg:flex space-x-5">
              <Link 
                to="/browse" 
                className={`text-sm font-medium transition ${
                  isActive('/browse') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/tv-shows" 
                className={`text-sm font-medium transition ${
                  isActive('/tv-shows') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                TV Shows
              </Link>
              <Link 
                to="/movies" 
                className={`text-sm font-medium transition ${
                  isActive('/movies') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/new-popular" 
                className={`text-sm font-medium transition ${
                  isActive('/new-popular') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                New & Popular
              </Link>
              <Link 
                to="/my-list" 
                className={`text-sm font-medium transition ${
                  isActive('/my-list') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                My List
              </Link>
              <Link 
                to="/browse-by-language" 
                className={`text-sm font-medium transition ${
                  isActive('/browse-by-language') ? 'text-white' : 'text-gray-300 hover:text-gray-200'
                }`}
              >
                Browse by Languages
              </Link>
            </div>
          )}
        </div>
        
        {user && (
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center bg-black border border-white">
                  <FaSearch className="text-white ml-3" size={14} />
                  <input
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white px-3 py-2 outline-none text-sm w-64"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearch(false)}
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-white hover:text-gray-300 transition"
                >
                  <FaSearch size={18} />
                </button>
              )}
            </div>

            {/* Kids */}
            <Link to="/kids" className="text-white hover:text-gray-300 transition text-sm font-medium">
              Kids
            </Link>

            {/* Notifications */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition">
                <FaBell size={18} />
              </button>
              <div className="absolute right-0 top-8 bg-black border-t-2 border-white w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-16 h-9 bg-gray-600 rounded"></div>
                    <div>
                      <p className="text-white text-sm">New arrival</p>
                      <p className="text-gray-400 text-xs">A new movie is now available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-9 bg-gray-600 rounded"></div>
                    <div>
                      <p className="text-white text-sm">Now trending</p>
                      <p className="text-gray-400 text-xs">Check out what's trending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="relative group">
              <div className="flex items-center space-x-1 cursor-pointer">
                <div className="w-8 h-8 rounded overflow-hidden">
                  <img 
                    src="https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <FaCaretDown className="text-white" size={12} />
              </div>
              <div className="absolute right-0 top-10 bg-black border-t-2 border-white w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-800">
                    <div className="w-6 h-6 rounded overflow-hidden">
                      <img 
                        src="https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white text-sm">Profile 1</span>
                  </div>
                  <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-800">
                    <div className="w-6 h-6 rounded overflow-hidden">
                      <img 
                        src="https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofcaEODjeQpZYvMxdntOzaOmewhVn8qtLwjDp_ijcCiCv8Zb5ZLuaEqAeEuQkQyPOzgBQ.png?r=bd7" 
                        alt="Kids Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white text-sm">Kids</span>
                  </div>
                  <hr className="border-gray-600 my-2" />
                  <Link to="/manage-profiles" className="block px-4 py-2 text-white text-sm hover:bg-gray-800">
                    Manage Profiles
                  </Link>
                  <Link to="/account" className="block px-4 py-2 text-white text-sm hover:bg-gray-800">
                    Account
                  </Link>
                  <Link to="/help" className="block px-4 py-2 text-white text-sm hover:bg-gray-800">
                    Help Center
                  </Link>
                  <hr className="border-gray-600 my-2" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-800"
                  >
                    Sign out of Netflix
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showSearchResults && (
        <SearchResults 
          searchQuery={searchQuery} 
          onClose={closeSearch}
          userList={userList}
        />
      )}
    </nav>
  );
};

export default Navbar;