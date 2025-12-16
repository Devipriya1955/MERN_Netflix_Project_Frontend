import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '23d2e6657fe9cef55e0aebfd9d0847be';
const BACKUP_API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const tmdbAPI = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  timeout: 10000
});

export const tmdbService = {
  // Get trending movies
  getTrending: () => tmdbAPI.get('/trending/movie/week'),
  
  // Get popular movies
  getPopular: () => tmdbAPI.get('/movie/popular'),
  
  // Get top rated movies
  getTopRated: () => tmdbAPI.get('/movie/top_rated'),
  
  // Get movies by genre
  getByGenre: (genreId) => tmdbAPI.get('/discover/movie', {
    params: { with_genres: genreId }
  }),
  
  // Get movie details with videos
  getMovieDetails: (movieId) => tmdbAPI.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits' }
  }),
  
  // Get movie videos (trailers) - handle both movie and TV
  getMovieVideos: async (movieId) => {
    try {
      // Try movie first
      const response = await tmdbAPI.get(`/movie/${movieId}/videos`);
      return response;
    } catch (error) {
      // If movie fails, try TV show
      try {
        const response = await tmdbAPI.get(`/tv/${movieId}/videos`);
        return response;
      } catch (tvError) {
        throw error; // Return original movie error
      }
    }
  },
  
  // Helper functions
  getImageUrl: (path) => path ? `${TMDB_IMAGE_BASE_URL}${path}` : null,
  getBackdropUrl: (path) => path ? `${TMDB_BACKDROP_BASE_URL}${path}` : null,
  
  // Genre IDs
  genres: {
    action: 28,
    comedy: 35,
    horror: 27,
    romance: 10749,
    thriller: 53,
    drama: 18,
    scifi: 878
  }
};

export default tmdbService;