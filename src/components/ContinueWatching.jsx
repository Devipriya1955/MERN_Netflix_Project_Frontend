import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import api from '../utils/api';

const ContinueWatching = ({ onPlayMovie }) => {
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContinueWatching();
  }, []);

  const fetchContinueWatching = async () => {
    try {
      const response = await api.get('/user/continue-watching');
      setContinueWatchingList(response.data);
    } catch (error) {
      console.error('Error fetching continue watching:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (currentTime, duration) => {
    if (!duration) return 0;
    return Math.min((currentTime / duration) * 100, 100);
  };

  const formatTimeRemaining = (currentTime, duration) => {
    if (!duration) return '';
    const remaining = duration - currentTime;
    const minutes = Math.floor(remaining / 60);
    if (minutes < 60) {
      return `${minutes}m left`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m left`;
  };

  if (loading) {
    return (
      <div className="px-4 lg:px-16 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-80 h-44 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (continueWatchingList.length === 0) {
    return null;
  }

  return (
    <div className="px-4 lg:px-16 mb-8">
      <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">Continue Watching</h2>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {continueWatchingList.map((item) => (
          <div key={item._id} className="flex-shrink-0 w-80 group cursor-pointer">
            <div className="relative">
              <img
                src={item.movie?.backdrop || item.movie?.poster || 'https://via.placeholder.com/320x180/333333/ffffff?text=Movie'}
                alt={item.movie?.title || 'Movie'}
                className="w-full h-44 object-cover rounded-md"
              />
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 rounded-b-md">
                <div 
                  className="h-full bg-netflix-red rounded-b-md"
                  style={{ width: `${getProgressPercentage(item.currentTime, item.duration)}%` }}
                />
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-md">
                <button
                  onClick={() => item.movie && onPlayMovie(item.movie, item.currentTime)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-30"
                >
                  <FaPlay size={24} />
                </button>
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-white font-medium text-sm truncate">{item.movie?.title || 'Unknown Movie'}</h3>
              <p className="text-gray-400 text-xs">
                {formatTimeRemaining(item.currentTime, item.duration)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;