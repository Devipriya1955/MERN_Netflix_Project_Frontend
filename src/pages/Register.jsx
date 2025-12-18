import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: useEffect instead of useState for side effect
  useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password
      );
      
      if (result.success) {
        navigate('/browse');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-16 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix" 
              className="h-8 lg:h-10"
            />
          </Link>
          <Link 
            to="/login" 
            className="text-lg font-medium text-black hover:underline"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Registration Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-medium text-black mb-4">
            Create a password to start your membership
          </h1>
          <p className="text-lg text-gray-600">
            Just a few more steps and you're done!
          </p>
          <p className="text-lg text-gray-600">
            We hate paperwork, too.
          </p>
        </div>

        {error && (
          <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded text-lg text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded text-lg text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Add a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded text-lg text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black pr-20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black text-sm font-medium"
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red hover:bg-red-700 text-white font-medium py-4 rounded text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Continue'}
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
