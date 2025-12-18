import { useState, useEffect } from 'react';
import { FaPlay, FaInfoCircle, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Hero = ({ movie, onPlay }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Auto-play video after 3 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!movie) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handlePlay = () => {
    if (onPlay && movie.videoUrl) {
      onPlay(movie, 0);
    } else if (movie.videoUrl) {
      window.open(movie.videoUrl, '_blank');
    } else {
      const searchQuery = encodeURIComponent(`${movie.title} ${movie.year || ''} trailer`);
      window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
    }
  };

  const handleMoreInfo = () => {
    // Show movie details modal
    console.log('More info for:', movie.title);
  };

  return (
    <div className="relative h-screen">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            autoPlay
            muted={isMuted}
            loop
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 lg:px-16">
        <div className="max-w-2xl">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 max-w-2xl leading-tight">
              {movie.title}
            </h1>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 mb-4 text-white">
            <span className="bg-red-600 px-2 py-1 text-sm font-bold">
              {Math.floor(movie.rating * 10)}% Match
            </span>
            <span className="text-lg font-medium">{movie.year}</span>

            <span className="text-lg">{movie.duration}</span>
            <span className="border border-gray-400 px-2 py-1 text-sm">HD</span>
          </div>

          {/* Description */}
          <p className="text-white text-lg lg:text-xl mb-8 max-w-xl leading-relaxed">
            {movie.description}
          </p>

          {/* Genres */}
          <div className="flex items-center space-x-2 mb-8 text-white">
            <span className="text-gray-400">Genres:</span>
            {movie.genre.slice(0, 3).map((genre, index) => (
              <span key={genre} className="text-white">
                {genre}{index < Math.min(movie.genre.length - 1, 2) ? ',' : ''}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-3 bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors"
            >
              <FaPlay className="text-black" size={20} />
              <span>Play</span>
            </button>
            
            <button
              onClick={handleMoreInfo}
              className="flex items-center space-x-3 bg-gray-500 bg-opacity-70 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-50 transition-colors"
            >
              <FaInfoCircle size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      {showVideo && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-32 right-8 lg:right-16 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full border border-gray-500 hover:bg-opacity-70 transition-colors"
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
      )}


    </div>
  );
};

export default Hero;