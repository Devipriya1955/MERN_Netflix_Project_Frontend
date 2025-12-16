import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaCheck, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { movieAPI, userAPI } from '../utils/api';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isInMyList, setIsInMyList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieAPI.getMovieById(id);
        setMovie(response.data);
        
        // Fetch similar movies
        const similarResponse = await movieAPI.getMoviesByCategory(response.data.category);
        setSimilarMovies(similarResponse.data.filter(m => m._id !== id).slice(0, 6));
      } catch (error) {
        console.error('Error fetching movie:', error);
        navigate('/browse');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  const handleAddToList = async () => {
    try {
      if (isInMyList) {
        await userAPI.removeFromMyList(movie._id);
        setIsInMyList(false);
      } else {
        await userAPI.addToMyList(movie._id);
        setIsInMyList(true);
      }
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 flex items-end h-full px-4 lg:px-16 pb-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6 text-sm">
              <span className="text-green-500 font-semibold">{movie.rating * 10}% Match</span>
              <span>{movie.year}</span>
              <span className="border border-gray-400 px-1">{movie.rating > 7 ? 'HD' : 'SD'}</span>
              <span>{movie.duration}</span>
            </div>
            
            <p className="text-lg mb-8 line-clamp-3">
              {movie.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">
                <FaPlay className="mr-2" />
                Play
              </button>
              
              <button
                onClick={handleAddToList}
                className="flex items-center bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/50 transition"
              >
                {isInMyList ? <FaCheck className="mr-2" /> : <FaPlus className="mr-2" />}
                My List
              </button>
              
              <button className="bg-gray-600/70 text-white p-3 rounded-full hover:bg-gray-600/50 transition">
                <FaThumbsUp />
              </button>
              
              <button className="bg-gray-600/70 text-white p-3 rounded-full hover:bg-gray-600/50 transition">
                <FaThumbsDown />
              </button>
              
              <button className="bg-gray-600/70 text-white p-3 rounded-full hover:bg-gray-600/50 transition">
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 lg:px-16 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About {movie.title}</h2>
            <p className="text-gray-300 mb-6">{movie.description}</p>
            
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Cast: </span>
                <span>{movie.cast?.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400">Genres: </span>
                <span>{movie.genre?.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400">This movie is: </span>
                <span>Exciting, Suspenseful, Dark</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">More Like This</h3>
            <div className="grid grid-cols-2 gap-4">
              {similarMovies.map((similarMovie) => (
                <div 
                  key={similarMovie._id}
                  onClick={() => navigate(`/movie/${similarMovie._id}`)}
                  className="cursor-pointer group"
                >
                  <div className="relative">
                    <img 
                      src={similarMovie.poster} 
                      alt={similarMovie.title}
                      className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded" />
                  </div>
                  <h4 className="text-sm font-medium mt-2 group-hover:text-gray-300 transition-colors">
                    {similarMovie.title}
                  </h4>
                  <p className="text-xs text-gray-400">{similarMovie.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;