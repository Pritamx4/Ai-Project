
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Premium Floating Navigation Bar */}
      <nav className="fixed z-50 w-full glass-dark backdrop-blur-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl font-display">AI Resume Builder</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/login"
                className="relative px-3 py-2 text-xs font-semibold text-white transition-all duration-300 rounded-lg overflow-hidden group sm:px-6 sm:py-2.5 sm:text-sm"
                style={{ 
                  background: 'var(--glass-bg-card)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
              <Link
                to="/register"
                className="btn-premium px-3 py-2 text-xs font-semibold sm:px-6 sm:py-2.5 sm:text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Premium Panel */}
      <div className="px-4 pt-24 pb-12 sm:pt-32 sm:pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="hero-panel animate-fadeInUp" style={{ padding: 'var(--space-lg) var(--space-md)' }}>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-display sm:mb-8">
              Build Your Professional
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
                Resume & Portfolio
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:text-2xl sm:mb-10">
              Generate ATS-optimized resumes and stunning portfolio websites using AI.
              Connect your GitHub, let AI do the magic! 🚀
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                to="/register"
                className="px-6 py-3 text-base font-bold text-center text-white transition-all duration-300 transform border rounded-xl bg-white/10 border-white/20 hover:scale-105 hover:bg-white/15 hover:shadow-2xl sm:px-10 sm:py-4 sm:text-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/demo"
                className="px-6 py-3 text-base font-bold text-center text-white transition-all duration-300 transform border rounded-xl bg-white/5 border-white/10 hover:scale-105 hover:bg-white/10 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="px-4 py-12 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display sm:mb-4">
              Powerful Features
            </h2>
            <p className="text-base text-gray-400 sm:text-lg lg:text-xl">Everything you need to land your dream job</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {/* Feature 1 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">🤖</div>
              <h3 className="mb-4 text-2xl font-bold text-white">AI-Powered</h3>
              <p className="leading-relaxed text-gray-300">
                Advanced AI generates professional summaries, optimizes keywords, and crafts compelling project descriptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">📊</div>
              <h3 className="mb-4 text-2xl font-bold text-white">ATS Optimized</h3>
              <p className="leading-relaxed text-gray-300">
                Resumes designed to pass Applicant Tracking Systems and get you more interviews.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">💼</div>
              <h3 className="mb-4 text-2xl font-bold text-white">GitHub Integration</h3>
              <p className="leading-relaxed text-gray-300">
                Automatically fetch your repositories and showcase your best projects with AI-enhanced descriptions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">🎨</div>
              <h3 className="mb-4 text-2xl font-bold text-white">Beautiful Portfolio</h3>
              <p className="leading-relaxed text-gray-300">
                Generate a stunning portfolio website with modern design and glassmorphism effects.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">📄</div>
              <h3 className="mb-4 text-2xl font-bold text-white">PDF Export</h3>
              <p className="leading-relaxed text-gray-300">
                Download your resume as a professional PDF, ready to send to employers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="premium-card">
              <div className="mb-6 text-6xl icon-glow">🔄</div>
              <h3 className="mb-4 text-2xl font-bold text-white">Easy Updates</h3>
              <p className="leading-relaxed text-gray-300">
                Update your profile anytime and regenerate your resume and portfolio instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium CTA Section */}
      <div className="px-4 py-12 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl p-6 mx-auto text-center hero-panel sm:p-10 lg:p-16">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-display sm:mb-6">
            Ready to Stand Out?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl sm:mb-10">
            Join thousands of job seekers who landed their dream jobs with our AI-powered platform.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 text-base font-bold text-white transition-all duration-300 transform border rounded-xl bg-white/10 border-white/20 hover:scale-105 hover:bg-white/15 hover:shadow-2xl sm:px-12 sm:py-4 sm:text-lg"
          >
            Start Building Now - It&apos;s Free!
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 border-t sm:px-6 lg:px-8 border-dark-border">
        <div className="mx-auto text-center text-gray-500 max-w-7xl">
          <p>&copy; 2026 AI Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
