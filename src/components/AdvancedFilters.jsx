import { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';

const AdvancedFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
    sortBy: 'trending',
    ...initialFilters
  });

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  
  const ratingRanges = [
    { label: '9.0+', min: 9.0, max: 10 },
    { label: '8.0 - 8.9', min: 8.0, max: 8.9 },
    { label: '7.0 - 7.9', min: 7.0, max: 7.9 },
    { label: '6.0 - 6.9', min: 6.0, max: 6.9 },
    { label: 'Below 6.0', min: 0, max: 5.9 }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating_high', label: 'Highest Rated' },
    { value: 'rating_low', label: 'Lowest Rated' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'alphabetical_desc', label: 'Z-A' }
  ];

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleGenreToggle = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleYearToggle = (year) => {
    setFilters(prev => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter(y => y !== year)
        : [...prev.years, year]
    }));
  };

  const handleRatingToggle = (rating) => {
    setFilters(prev => ({
      ...prev,
      ratings: prev.ratings.some(r => r.label === rating.label)
        ? prev.ratings.filter(r => r.label !== rating.label)
        : [...prev.ratings, rating]
    }));
  };

  const clearFilters = () => {
    setFilters({
      genres: [],
      years: [],
      ratings: [],
      sortBy: 'trending'
    });
  };

  const hasActiveFilters = filters.genres.length > 0 || filters.years.length > 0 || filters.ratings.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
          hasActiveFilters
            ? 'bg-netflix-red border-netflix-red text-white'
            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-400'
        }`}
      >
        <FaFilter size={14} />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-white text-netflix-red text-xs px-2 py-1 rounded-full">
            {filters.genres.length + filters.years.length + filters.ratings.length}
          </span>
        )}
        <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={12} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 w-96 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Filters</h3>
              <div className="flex items-center space-x-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-2">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:border-netflix-red focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-2">Genres</h4>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {genres.map(genre => (
                  <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className="rounded border-gray-600 bg-gray-800 text-netflix-red focus:ring-netflix-red"
                    />
                    <span className="text-gray-300 text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Years */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-2">Release Year</h4>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {years.slice(0, 15).map(year => (
                  <label key={year} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.years.includes(year)}
                      onChange={() => handleYearToggle(year)}
                      className="rounded border-gray-600 bg-gray-800 text-netflix-red focus:ring-netflix-red"
                    />
                    <span className="text-gray-300 text-sm">{year}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-4">
              <h4 className="text-gray-300 font-medium mb-2">IMDb Rating</h4>
              <div className="space-y-2">
                {ratingRanges.map(rating => (
                  <label key={rating.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.ratings.some(r => r.label === rating.label)}
                      onChange={() => handleRatingToggle(rating)}
                      className="rounded border-gray-600 bg-gray-800 text-netflix-red focus:ring-netflix-red"
                    />
                    <span className="text-gray-300 text-sm">{rating.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;