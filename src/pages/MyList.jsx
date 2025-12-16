import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import api from '../utils/api';

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchMyList();
  }, []);

  const fetchMyList = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/list');
      setMyList(response.data);
    } catch (error) {
      console.error('Error fetching my list:', error);
      setError('Failed to load your list');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading your list...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="pt-20 px-4 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
              My List
            </h1>
            <p className="text-gray-400 text-lg">
              {myList.length > 0 
                ? `${myList.length} title${myList.length !== 1 ? 's' : ''} in your list`
                : 'Your list is empty'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-600 text-white p-4 rounded mb-8">
              {error}
            </div>
          )}

          {/* Movies Grid */}
          {myList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {myList.map((movie, index) => (
                <div key={`${movie._id || movie.id}-${index}`}>
                  <MovieCard movie={movie} userList={myList} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <svg 
                    className="w-24 h-24 mx-auto text-gray-600 mb-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h2 className="text-white text-2xl font-bold mb-4">
                  Your list is empty
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Looks like you haven't added any titles to your list yet. 
                  Browse our collection and add movies and shows you want to watch later.
                </p>
                
                <a 
                  href="/browse" 
                  className="inline-block bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-gray-200 transition-colors"
                >
                  Browse Netflix
                </a>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {myList.length > 0 && (
            <div className="mt-16">
              <h2 className="text-white text-2xl font-bold mb-6">
                More Like This
              </h2>
              <p className="text-gray-400 mb-8">
                Based on what's in your list
              </p>
              
              {/* This would typically show recommended content */}
              <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
                <p className="text-gray-400">
                  Personalized recommendations coming soon...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyList;