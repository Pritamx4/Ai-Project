
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Navigation Bar */}
      <nav className="glass-dark fixed w-full z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">AI Resume Builder</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build Your Professional
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                Resume & Portfolio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Generate ATS-optimized resumes and stunning portfolio websites using AI.
              Connect your GitHub, let AI do the magic! 🚀
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="glass px-8 py-4 rounded-lg text-white font-semibold text-lg hover:scale-105 transform transition duration-200"
              >
                Create Free Account
              </Link>
              <Link
                to="/demo"
                className="glass-dark px-8 py-4 rounded-lg text-white font-semibold text-lg hover:scale-105 transform transition duration-200"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-gray-300">
                Advanced AI generates professional summaries, optimizes keywords, and crafts compelling project descriptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">ATS Optimized</h3>
              <p className="text-gray-300">
                Resumes designed to pass Applicant Tracking Systems and get you more interviews.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-white mb-3">GitHub Integration</h3>
              <p className="text-gray-300">
                Automatically fetch your repositories and showcase your best projects with AI-enhanced descriptions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-3">Beautiful Portfolio</h3>
              <p className="text-gray-300">
                Generate a stunning portfolio website with modern design and glassmorphism effects.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-white mb-3">PDF Export</h3>
              <p className="text-gray-300">
                Download your resume as a professional PDF, ready to send to employers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass p-8 rounded-2xl hover:scale-105 transform transition duration-200">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold text-white mb-3">Easy Updates</h3>
              <p className="text-gray-300">
                Update your profile anytime and regenerate your resume and portfolio instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass p-12 rounded-3xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Stand Out?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of job seekers who landed their dream jobs with our AI-powered platform.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 transform transition duration-200"
          >
            Start Building Now - It&apos;s Free!
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 AI Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
