import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/browse');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/US-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg)'
        }}
      />
      
      <header className="relative z-10 px-4 lg:px-16 py-4">
        <Link to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="h-8"
          />
        </Link>
      </header>

      <div className="relative z-10 flex justify-center items-center min-h-[80vh]">
        <div className="bg-black/75 backdrop-blur-sm p-12 lg:p-16 rounded-md max-w-md w-full mx-4">
          <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
          
          {error && (
            <div className="bg-orange-600 text-white p-4 rounded-md mb-6 text-sm">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Incorrect password.</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-gray-700 text-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                required
              />
            </div>
            
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 bg-gray-700 text-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-netflix-red hover:bg-red-700 text-white font-bold py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">Need help?</a>
          </div>

          <div className="mt-16 text-gray-400">
            <p>
              New to Netflix?{' '}
              <Link to="/register" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
            <p className="text-xs mt-4">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;