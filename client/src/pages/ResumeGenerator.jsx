import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';

const ResumeGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const generateResume = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await resumeService.generateResume({});
      setSuccess(true);
      setTimeout(() => {
        navigate('/resume-preview');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate resume. Please make sure you completed your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white hover:text-gray-300 mb-8 inline-flex items-center"
        >
          ← Back to Dashboard
        </button>

        <div className="glass p-8 rounded-2xl">
          <div className="text-center">
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Resume Generator
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Our AI will analyze your profile and create an ATS-optimized resume with:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-1">Professional Summary</h3>
                <p className="text-gray-400 text-sm">AI-crafted summary highlighting your strengths</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-1">ATS Keywords</h3>
                <p className="text-gray-400 text-sm">Optimized keywords for applicant tracking systems</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h3 className="text-white font-semibold mb-1">Enhanced Descriptions</h3>
                <p className="text-gray-400 text-sm">Improved project and work descriptions</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">💼</div>
                <h3 className="text-white font-semibold mb-1">Professional Format</h3>
                <p className="text-gray-400 text-sm">Clean, modern layout preferred by recruiters</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6">
                ✓ Resume generated successfully! Redirecting to preview...
              </div>
            )}

            <button
              onClick={generateResume}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Generating Resume...
                </>
              ) : (
                '🚀 Generate My Resume'
              )}
            </button>

            <p className="text-gray-400 text-sm mt-4">
              This process takes about 10-15 seconds
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="glass mt-8 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">💡 Tips for Best Results</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Make sure you've completed your profile with all relevant information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Add detailed project descriptions for better AI-generated content</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include specific skills and technologies you've worked with</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Connect your GitHub account for automatic project import</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
