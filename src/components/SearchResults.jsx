import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import MovieCard from './MovieCard';
import api from '../utils/api';

const SearchResults = ({ searchQuery, onClose, userList = [] }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    }
  }, [searchQuery]);

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await api.get(`/movies/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (!searchQuery.trim()) return null;

  return (
    <div className="fixed inset-0 bg-netflix-black z-50 pt-20">
      <div className="px-4 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl lg:text-4xl font-bold">
            Search results for "{searchQuery}"
          </h1>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie._id} movie={movie} userList={userList} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">No results found for "{searchQuery}"</p>
            <p className="mt-2">Try different keywords or browse our categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;