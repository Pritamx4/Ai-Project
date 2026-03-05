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
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Premium Floating Navigation Bar */}
      <nav className="glass-dark backdrop-blur-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <h1 className="text-lg font-bold tracking-tight text-white font-display sm:text-2xl lg:text-3xl">AI Resume Builder</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-5">
              <span className="hidden text-sm font-medium text-gray-200 sm:inline sm:text-base">Welcome, {user?.fullName}</span>
              <span className="inline text-xs font-medium text-gray-200 sm:hidden">{user?.fullName?.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="relative px-3 py-2 text-xs font-semibold text-white transition-all duration-300 rounded-lg overflow-hidden group sm:px-6 sm:py-2.5 sm:text-sm"
                style={{ 
                  background: 'rgba(239, 68, 68, 0.4)',
                  border: '1px solid rgba(239, 68, 68, 0.7)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-12">
        {/* Premium Welcome Hero Panel */}
        <div className="mb-8 hero-panel sm:mb-12 animate-fadeInUp" style={{ padding: 'var(--space-lg) var(--space-md)' }}>
          <div className="flex flex-col items-start mb-4 sm:flex-row sm:items-center">
            <div className="mb-2 text-4xl icon-glow sm:text-5xl sm:mr-4 sm:mb-0">🎉</div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl font-display">
              Welcome to Your Dashboard!
            </h2>
          </div>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
            Let&apos;s create an amazing resume and portfolio that showcases your skills and experience.
          </p>
        </div>

        {/* Premium Action Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {/* Profile Card */}
          <Link
            to="/profile"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">👤</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Complete Profile</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              Add your personal information, skills, experience, and education.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              {profile?.isComplete ? '✓ Completed' : '→ Get Started'}
            </div>
          </Link>

          {/* GitHub Integration Card */}
          <Link
            to="/github"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">💻</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Connect GitHub</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              Link your GitHub account to automatically fetch your projects.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              {profile?.githubUsername ? '✓ Connected' : '→ Connect Now'}
            </div>
          </Link>

          {/* Generate Resume Card */}
          <Link
            to="/generate-resume"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">📄</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Generate Resume</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              Use AI to create an ATS-optimized professional resume.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              → Generate Now
            </div>
          </Link>

          {/* Portfolio Card */}
          <Link
            to="/portfolio"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">🌐</div>
            <h3 className="mb-3 text-2xl font-bold text-white">View Portfolio</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              Check out your automatically generated portfolio website.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              → View Portfolio
            </div>
          </Link>

          {/* Resume Preview Card */}
          <Link
            to="/resume-preview"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">👁️</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Resume Preview</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              View and download your generated resume as PDF.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              → Preview Resume
            </div>
          </Link>

          {/* Settings Card */}
          <Link
            to="/settings"
            className="cursor-pointer premium-card"
          >
            <div className="mb-6 text-6xl icon-glow">⚙️</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Settings</h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              Manage your account settings and preferences.
            </p>
            <div className="pt-4 mt-auto text-sm font-bold text-gray-200">
              → Manage Settings
            </div>
          </Link>
        </div>

        {/* Premium Quick Stats */}
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 sm:gap-8 sm:mt-12">
          <div className="stat-card">
            <div className="mb-3 text-4xl font-bold text-white">
              {profile?.projects?.length || 0}
            </div>
            <div className="font-semibold text-gray-300">Projects Added</div>
          </div>
          <div className="stat-card">
            <div className="mb-3 text-4xl font-bold text-white">
              {profile?.skills?.length || 0}
            </div>
            <div className="font-semibold text-gray-300">Skills Listed</div>
          </div>
          <div className="stat-card">
            <div className="mb-3 text-4xl font-bold text-white">
              {profile?.experience?.length || 0}
            </div>
            <div className="font-semibold text-gray-300">Work Experiences</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
