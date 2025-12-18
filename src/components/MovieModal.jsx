import { useState, useEffect } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const MovieModal = ({ movie, isOpen, onClose, userList = [] }) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsInMyList(userList.some(item => item._id === movie?._id));
  }, [userList, movie?._id]);

  const handleAddToList = async () => {
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

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      
      <div className="relative bg-netflix-black rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-netflix-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Hero Section */}
        <div className="relative h-96">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-white text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <FaPlay size={16} />
                <span>Play</span>
              </button>
              
              <button
                onClick={handleAddToList}
                disabled={loading}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  isInMyList 
                    ? 'bg-white text-black border-white hover:bg-gray-200' 
                    : 'bg-netflix-black text-white border-gray-400 hover:border-white hover:bg-gray-800'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="animate-spin w-5 h-5 border border-current border-t-transparent rounded-full" />
                ) : isInMyList ? (
                  <FaCheck size={16} />
                ) : (
                  <FaPlus size={16} />
                )}
              </button>
              
              <button className="p-3 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
                <FaThumbsUp size={16} />
              </button>
              
              <button className="p-3 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
                <FaThumbsDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-500 font-bold text-lg">
                  {Math.round(movie.rating * 10)}% Match
                </span>
                <span className="text-gray-300">{movie.year}</span>

                <span className="text-gray-300">{movie.duration || '2h 15m'}</span>
              </div>
              
              <p className="text-white text-lg leading-relaxed mb-6">
                {movie.description}
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">
                  {movie.cast ? movie.cast.slice(0, 3).join(', ') : 'Cast information not available'}
                </span>
              </div>
              
              <div>
                <span className="text-gray-400">Genres: </span>
                <span className="text-white">
                  {movie.genre ? movie.genre.join(', ') : 'Genre information not available'}
                </span>
              </div>
              
              <div>
                <span className="text-gray-400">Rating: </span>
                <span className="text-white">{movie.rating}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;