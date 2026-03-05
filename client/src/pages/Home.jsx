
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation Bar */}
      <nav className="fixed z-50 w-full glass-dark backdrop-blur-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">AI Resume Builder</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-gray-300 transition rounded-md hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white transition border rounded-md bg-dark-hover border-dark-border hover:bg-dark-card"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              Build Your Professional
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">
                Resume & Portfolio
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-400 md:text-2xl">
              Generate ATS-optimized resumes and stunning portfolio websites using AI.
              Connect your GitHub, let AI do the magic! 🚀
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition duration-200 transform rounded-lg glass hover:scale-105"
              >
                Create Free Account
              </Link>
              <Link
                to="/demo"
                className="px-8 py-4 text-lg font-semibold text-white transition duration-200 transform rounded-lg glass-dark hover:scale-105"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-4xl font-bold text-center text-white">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">🤖</div>
              <h3 className="mb-3 text-2xl font-bold text-white">AI-Powered</h3>
              <p className="text-gray-400">
                Advanced AI generates professional summaries, optimizes keywords, and crafts compelling project descriptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">📊</div>
              <h3 className="mb-3 text-2xl font-bold text-white">ATS Optimized</h3>
              <p className="text-gray-400">
                Resumes designed to pass Applicant Tracking Systems and get you more interviews.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">💼</div>
              <h3 className="mb-3 text-2xl font-bold text-white">GitHub Integration</h3>
              <p className="text-gray-400">
                Automatically fetch your repositories and showcase your best projects with AI-enhanced descriptions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">🎨</div>
              <h3 className="mb-3 text-2xl font-bold text-white">Beautiful Portfolio</h3>
              <p className="text-gray-400">
                Generate a stunning portfolio website with modern design and glassmorphism effects.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">📄</div>
              <h3 className="mb-3 text-2xl font-bold text-white">PDF Export</h3>
              <p className="text-gray-400">
                Download your resume as a professional PDF, ready to send to employers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 transition duration-200 transform glass rounded-2xl hover:scale-105">
              <div className="mb-4 text-5xl">🔄</div>
              <h3 className="mb-3 text-2xl font-bold text-white">Easy Updates</h3>
              <p className="text-gray-400">
                Update your profile anytime and regenerate your resume and portfolio instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl p-12 mx-auto text-center glass rounded-3xl">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Stand Out?
          </h2>
          <p className="mb-8 text-xl text-gray-400">
            Join thousands of job seekers who landed their dream jobs with our AI-powered platform.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 text-lg font-bold text-white transition duration-200 transform border rounded-lg bg-dark-hover border-dark-border hover:scale-105 hover:bg-dark-card"
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
