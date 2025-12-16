import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import ContinueWatching from '../components/ContinueWatching';
import VideoPlayer from '../components/VideoPlayer';
import api from '../utils/api';

const Browse = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [heroMovie, setHeroMovie] = useState(null);
  const [userList, setUserList] = useState([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const { user } = useAuth();
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/tv-shows':
        return { title: 'TV Shows', showHero: false };
      case '/movies':
        return { title: 'Movies', showHero: false };
      case '/new-popular':
        return { title: 'New & Popular', showHero: false };
      case '/browse-by-language':
        return { title: 'Browse by Languages', showHero: false };
      case '/kids':
        return { title: 'Kids & Family', showHero: false };
      case '/manage-profiles':
        return { title: 'Manage Profiles', showHero: false };
      case '/account':
        return { title: 'Account', showHero: false };
      case '/help':
        return { title: 'Help Center', showHero: false };
      default:
        return { title: 'Home', showHero: true };
    }
  };

  const pageInfo = getPageInfo();

  const categories = [
    { key: 'trending', title: 'Trending Now' },
    { key: 'toprated', title: 'Top Rated' },
    { key: 'recentlyadded', title: 'Recently Added' },
    { key: 'action', title: 'Action Thrillers' },
    { key: 'comedy', title: 'Comedies' },
    { key: 'horror', title: 'Horror Movies' },
    { key: 'romance', title: 'Romantic Movies' },
    { key: 'thriller', title: 'Thrillers' },
    { key: 'scifi', title: 'Sci-Fi Movies' },
    { key: 'documentary', title: 'Documentaries' },
    { key: 'kids', title: 'Kids & Family' }
  ];

  useEffect(() => {
    fetchMovies();
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await api.get('/user/list');
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log('Fetching movies from API...');
      
      const response = await api.get('/movies');
      console.log('Movies fetched successfully:', response.data.length);
      
      const allMovies = response.data;
      
      // Group movies by category
      const moviesByCategory = {};
      categories.forEach(category => {
        moviesByCategory[category.key] = allMovies.filter(movie => 
          movie.category === category.key
        );
      });
      
      console.log('Movies grouped by category:', Object.keys(moviesByCategory).map(key => `${key}: ${moviesByCategory[key].length}`));
      
      setMovies(moviesByCategory);
      
      // Set random hero movie from trending
      const trendingMovies = moviesByCategory.trending || [];
      if (trendingMovies.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        setHeroMovie(trendingMovies[randomIndex]);
        console.log('Hero movie set:', trendingMovies[randomIndex].title);
      } else {
        // Fallback to any movie if no trending movies
        const firstCategory = Object.keys(moviesByCategory).find(key => moviesByCategory[key].length > 0);
        if (firstCategory && moviesByCategory[firstCategory].length > 0) {
          setHeroMovie(moviesByCategory[firstCategory][0]);
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayMovie = (movie, startFromTime = 0) => {
    setCurrentMovie(movie);
    setStartTime(startFromTime);
    setShowVideoPlayer(true);
  };

  const handleVideoProgress = async (progressData) => {
    try {
      await api.post('/user/watch-progress', progressData);
    } catch (error) {
      console.error('Error saving watch progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Netflix...</div>
      </div>
    );
  }

  if (!loading && Object.keys(movies).length === 0) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-white text-xl">No content available</div>
        </div>
      </div>
    );
  }

  const renderPageContent = () => {
    const topMargin = pageInfo.showHero ? 'relative z-10 -mt-32 pb-20' : 'pt-20 pb-20';
    
    if (pageInfo.title === 'Home') {
      return (
        <div className={topMargin}>
          {categories.map(category => (
            movies[category.key] && movies[category.key].length > 0 && (
              <MovieRow
                key={category.key}
                title={category.title}
                movies={movies[category.key]}
                category={category.key}
                userList={userList}
                onPlay={handlePlayMovie}
              />
            )
          ))}
        </div>
      );
    }

    const getFilteredCategories = () => {
      switch (location.pathname) {
        case '/tv-shows':
          return [{ key: 'trending', title: 'Trending TV Shows' }, { key: 'toprated', title: 'Top Rated Series' }];
        case '/movies':
          return [{ key: 'action', title: 'Action Movies' }, { key: 'comedy', title: 'Comedy Movies' }, { key: 'horror', title: 'Horror Movies' }];
        case '/new-popular':
          return [{ key: 'trending', title: 'Trending Now' }, { key: 'toprated', title: 'New Releases' }];
        case '/kids':
          return [{ key: 'kids', title: 'Kids & Family Movies' }, { key: 'comedy', title: 'Family Comedies' }];
        default:
          return categories;
      }
    };

    const filteredCategories = getFilteredCategories();

    return (
      <div className={topMargin}>
        <div className="px-4 lg:px-16 mb-8">
          <h1 className="text-white text-4xl font-bold">{pageInfo.title}</h1>
        </div>
        {filteredCategories.map(category => (
          movies[category.key] && movies[category.key].length > 0 && (
            <MovieRow
              key={category.key}
              title={category.title}
              movies={movies[category.key]}
              category={category.key}
              userList={userList}
              onPlay={handlePlayMovie}
            />
          )
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      {pageInfo.showHero && heroMovie && <Hero movie={heroMovie} onPlay={handlePlayMovie} />}
      
      {pageInfo.title === 'Home' && (
        <ContinueWatching onPlayMovie={handlePlayMovie} />
      )}
      
      {renderPageContent()}
      
      <VideoPlayer 
        movie={currentMovie}
        isOpen={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
        onProgress={handleVideoProgress}
        startTime={startTime}
      />
      
      <Footer />
    </div>
  );
};

export default Browse;