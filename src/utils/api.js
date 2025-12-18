import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// Request interceptor to add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const movieAPI = {
  getAllMovies: () => API.get('/movies'),
  getMoviesByCategory: (category) => API.get(`/movies/category/${category}`),
  getMovieById: (id) => API.get(`/movies/${id}`)
};

export const userAPI = {
  addToMyList: (movieId) => API.post('/user/list/add', { movieId }),
  removeFromMyList: (movieId) => API.post('/user/list/remove', { movieId }),
  getMyList: () => API.get('/user/list')
};

export default API;
