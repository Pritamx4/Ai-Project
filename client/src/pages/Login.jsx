import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center mb-8 text-white hover:text-gray-300"
        >
          ← Back to Home
        </Link>

        {/* Login Card */}
        <div className="p-8 mt-4 glass rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-gray-300">Login to continue building your future</p>
          </div>

          {error && (
            <div className="px-4 py-3 mb-4 text-red-200 bg-red-500 border border-red-500 rounded-lg bg-opacity-20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-white border border-gray-400 rounded-lg bg-opacity-10 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-white border border-gray-400 rounded-lg bg-opacity-10 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white transition duration-200 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
