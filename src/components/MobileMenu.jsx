import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaTv, FaFilm, FaFire, FaList, FaGlobe, FaChild } from 'react-icons/fa';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/browse', label: 'Home', icon: FaHome },
    { path: '/tv-shows', label: 'TV Shows', icon: FaTv },
    { path: '/movies', label: 'Movies', icon: FaFilm },
    { path: '/new-popular', label: 'New & Popular', icon: FaFire },
    { path: '/my-list', label: 'My List', icon: FaList },
    { path: '/browse-by-language', label: 'Browse by Languages', icon: FaGlobe },
    { path: '/kids', label: 'Kids', icon: FaChild }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 pt-16">
          <div className="flex flex-col space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-netflix-red text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-lg">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;