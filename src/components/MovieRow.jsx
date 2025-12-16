import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, category, userList = [], onPlay }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    setScrollPosition(newPosition);
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < (movies.length * 300 - (rowRef.current?.clientWidth || 0));

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative mb-8 group">
      {/* Title */}
      <h2 className="text-white text-xl lg:text-2xl font-bold mb-4 px-4 lg:px-16">
        {title}
      </h2>

      {/* Movies Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 lg:left-12 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 lg:right-12 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
          >
            <FaChevronRight size={20} />
          </button>
        )}

        {/* Movies Scroll Container */}
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 lg:px-16 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          {movies.map((movie, index) => (
            <div key={`${movie._id || movie.id}-${index}`} className="flex-shrink-0">
              <MovieCard movie={movie} userList={userList} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;