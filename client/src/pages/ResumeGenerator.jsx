import { useState } from 'react';
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
    <div className="min-h-screen py-6 bg-dark-bg container-padding sm:py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center mb-6 text-sm text-gray-300 transition sm:mb-8 hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <div className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)' }}>
          <div className="text-center">
            <div className="mb-4 text-4xl sm:text-5xl md:text-6xl sm:mb-6">🤖</div>
            <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl font-display">
              AI Resume Generator
            </h1>
            <p className="mb-6 text-base text-gray-400 sm:text-lg sm:mb-8">
              Our AI will analyze your profile and create an ATS-optimized resume with:
            </p>

            <div className="grid grid-cols-1 gap-4 mb-6 text-left sm:grid-cols-2 sm:mb-8">
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-1">Professional Summary</h3>
                <p className="text-gray-500 text-sm">AI-crafted summary highlighting your strengths</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-1">ATS Keywords</h3>
                <p className="text-gray-500 text-sm">Optimized keywords for applicant tracking systems</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h3 className="text-white font-semibold mb-1">Enhanced Descriptions</h3>
                <p className="text-gray-500 text-sm">Improved project and work descriptions</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <div className="text-2xl mb-2">💼</div>
                <h3 className="text-white font-semibold mb-1">Professional Format</h3>
                <p className="text-gray-500 text-sm">Clean, modern layout preferred by recruiters</p>
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
              className="px-8 py-3 text-base font-bold text-white transition duration-200 border bg-dark-hover border-dark-border rounded-lg hover:bg-dark-card disabled:opacity-50 disabled:cursor-not-allowed sm:px-12 sm:py-4 sm:text-lg"
            >
              {loading ? (
                <>
                  <span className="inline-block mr-2 animate-spin">⏳</span>
                  Generating Resume...
                </>
              ) : (
                '🚀 Generate My Resume'
              )}
            </button>

            <p className="mt-4 text-xs text-gray-500 sm:text-sm">
              This process takes about 10-15 seconds
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-4 mt-6 glass sm:p-6 sm:mt-8 rounded-2xl">
          <h3 className="mb-3 text-lg font-bold text-white sm:text-xl sm:mb-4">💡 Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-gray-400 sm:text-base">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Make sure you&apos;ve completed your profile with all relevant information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Add detailed project descriptions for better AI-generated content</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include specific skills and technologies you&apos;ve worked with</span>
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
