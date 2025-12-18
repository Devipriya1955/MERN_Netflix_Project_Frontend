import { useState, useEffect } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown, FaChevronDown, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import MovieModal from './MovieModal';
import { DownloadButton } from './DownloadManager';

const MovieCard = ({ movie, userList = [], onPlay }) => {
  if (!movie) return null;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [liked, setLiked] = useState(null);
  const [posterError, setPosterError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsInMyList(userList.some(item => item._id === movie._id));
    setPosterError(false);
    setBackdropError(false);
  }, [userList, movie._id, movie.poster, movie.backdrop]);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay(movie);
    }
  };

  const handleAddToList = async (e) => {
    e.stopPropagation();
    if (loading) return;
    
    setLoading(true);
    try {
      if (isInMyList) {
        await api.post('/user/list/remove', { movieId: movie._id });
        setIsInMyList(false);
      } else {
        await api.post('/user/list/add', { movieId: movie._id });
        setIsInMyList(true);
      }
    } catch (error) {
      console.error('Error updating my list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(liked === true ? null : true);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setLiked(liked === false ? null : false);
  };

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };



  const fallbackImage = `https://placehold.co/300x450/1a1a1a/ffffff?text=${encodeURIComponent(movie.title?.substring(0, 20) || 'Movie')}`;
  const fallbackBackdrop = `https://placehold.co/1280x720/1a1a1a/ffffff?text=${encodeURIComponent(movie.title?.substring(0, 30) || 'Movie')}`;

  return (
    <>
      <div 
        className="relative group cursor-pointer hover:z-50" 
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Vertical Movie Card */}
        <div className="w-48 h-72 rounded-sm overflow-hidden bg-gray-900 transition-transform duration-300 group-hover:scale-105 cursor-pointer">
          <img
            src={posterError ? fallbackImage : (movie.poster || fallbackImage)}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setPosterError(true)}
          />
        </div>

        {/* Hover Popup */}
        {isHovered && (
        <div className="absolute top-0 left-0 w-80 bg-netflix-black rounded-md shadow-2xl z-[100] transition-all duration-300 transform -translate-y-8 scale-110 border border-gray-700">
        {/* Video/Image Header */}
        <div className="relative w-full h-44 rounded-t-lg overflow-hidden">
          <img
            src={backdropError ? fallbackBackdrop : (movie.backdrop || movie.poster || fallbackBackdrop)}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setBackdropError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black/90 to-transparent" />
          
          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute bottom-4 left-4 bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
          >
            <FaPlay size={14} className="ml-0.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-1">{movie.title}</h3>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToList}
                disabled={loading}
                className={`p-2 rounded-full border-2 transition-all duration-200 ${
                  isInMyList 
                    ? 'bg-white text-black border-white hover:bg-gray-200' 
                    : 'bg-netflix-black text-white border-gray-400 hover:border-white hover:bg-gray-800'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                title={isInMyList ? 'Remove from My List' : 'Add to My List'}
              >
                {loading ? (
                  <div className="animate-spin w-3 h-3 border border-current border-t-transparent rounded-full" />
                ) : isInMyList ? (
                  <FaCheck size={12} />
                ) : (
                  <FaPlus size={12} />
                )}
              </button>
              
              <button
                onClick={handleLike}
                className={`p-2 rounded-full border-2 transition-all duration-200 ${
                  liked === true
                    ? 'bg-white text-black border-white hover:bg-gray-200'
                    : 'bg-netflix-black text-white border-gray-400 hover:border-white hover:bg-gray-800 hover:scale-110'
                }`}
                title="Like"
              >
                <FaThumbsUp size={12} />
              </button>
              
              <button
                onClick={handleDislike}
                className={`p-2 rounded-full border-2 transition-all duration-200 ${
                  liked === false
                    ? 'bg-white text-black border-white hover:bg-gray-200'
                    : 'bg-netflix-black text-white border-gray-400 hover:border-white hover:bg-gray-800 hover:scale-110'
                }`}
                title="Dislike"
              >
                <FaThumbsDown size={12} />
              </button>
              
              <DownloadButton movie={movie} />
            </div>
            
            <button
              onClick={handleMoreInfo}
              className="p-2 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-gray-800 hover:scale-110 transition-all duration-200"
              title="More Info"
            >
              <FaChevronDown size={12} />
            </button>
          </div>

          {/* Movie Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-sm">
              <span className={`font-bold ${getRatingColor(movie.rating)}`}>
                {Math.round(movie.rating * 10)}% Match
              </span>
              <span className="text-gray-300">{movie.year}</span>

            </div>

            <div className="flex flex-wrap gap-1">
              {movie.genre && movie.genre.slice(0, 3).map((genre, index) => (
                <span key={genre} className="text-gray-300 text-sm">
                  {genre}
                  {index < Math.min(movie.genre.length - 1, 2) && (
                    <span className="text-gray-500 mx-1">•</span>
                  )}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
              {movie.description}
            </p>
          </div>
        </div>
        </div>
        )}
      </div>
      
      <MovieModal 
        movie={movie} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        userList={userList}
      />
    </>
  );
};

export default MovieCard;