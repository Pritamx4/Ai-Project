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
    <div className="flex items-center justify-center min-h-screen container-padding bg-primary">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-sm transition-all sm:mb-8 text-muted hover:text-primary"
        >
          ← Back to Home
        </Link>

        {/* Login Card */}
        <div className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)' }}>
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl section-title" style={{ marginBottom: 'var(--space-sm)' }}>Welcome Back!</h2>
            <p className="text-sm sm:text-base text-muted">Login to continue building your future</p>
          </div>

          {error && (
            <div className="px-4 py-3 mb-4 text-red-200 bg-red-500 border border-red-500 bg-opacity-20" style={{ borderRadius: 'var(--radius-md)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted" style={{ marginBottom: 'var(--space-sm)' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted" style={{ marginBottom: 'var(--space-sm)' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm sm:text-base text-muted">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold transition-all text-secondary hover:text-primary">
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
