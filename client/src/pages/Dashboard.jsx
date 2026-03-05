import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { profileService } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation Bar */}
      <nav className="glass-dark backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">AI Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.fullName}</span>
              <button
                onClick={handleLogout}
                className="bg-dark-hover border border-dark-border text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-dark-card transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="glass p-8 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Welcome to Your Dashboard!
          </h2>
          <p className="text-gray-400 text-lg">
            Let&apos;s create an amazing resume and portfolio that showcases your skills and experience.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Link
            to="/profile"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-2xl font-bold text-white mb-2">Complete Profile</h3>
            <p className="text-gray-400">
              Add your personal information, skills, experience, and education.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              {profile?.isComplete ? '✓ Completed' : '→ Get Started'}
            </div>
          </Link>

          {/* GitHub Integration Card */}
          <Link
            to="/github"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-2xl font-bold text-white mb-2">Connect GitHub</h3>
            <p className="text-gray-400">
              Link your GitHub account to automatically fetch your projects.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              {profile?.githubUsername ? '✓ Connected' : '→ Connect Now'}
            </div>
          </Link>

          {/* Generate Resume Card */}
          <Link
            to="/generate-resume"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">Generate Resume</h3>
            <p className="text-gray-400">
              Use AI to create an ATS-optimized professional resume.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              → Generate Now
            </div>
          </Link>

          {/* Portfolio Card */}
          <Link
            to="/portfolio"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-white mb-2">View Portfolio</h3>
            <p className="text-gray-400">
              Check out your automatically generated portfolio website.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              → View Portfolio
            </div>
          </Link>

          {/* Resume Preview Card */}
          <Link
            to="/resume-preview"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Resume Preview</h3>
            <p className="text-gray-400">
              View and download your generated resume as PDF.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              → Preview Resume
            </div>
          </Link>

          {/* Settings Card */}
          <Link
            to="/settings"
            className="glass p-6 rounded-2xl hover:scale-105 transform transition duration-200 cursor-pointer"
          >
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Settings</h3>
            <p className="text-gray-400">
              Manage your account settings and preferences.
            </p>
            <div className="mt-4 text-gray-300 font-semibold">
              → Manage Settings
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-dark p-6 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">
              {profile?.projects?.length || 0}
            </div>
            <div className="text-gray-400">Projects Added</div>
          </div>
          <div className="glass-dark p-6 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">
              {profile?.skills?.length || 0}
            </div>
            <div className="text-gray-400">Skills Listed</div>
          </div>
          <div className="glass-dark p-6 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">
              {profile?.experience?.length || 0}
            </div>
            <div className="text-gray-400">Work Experiences</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
