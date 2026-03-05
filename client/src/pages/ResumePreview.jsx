import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await resumeService.getResume();
      setResume(data);
    } catch (err) {
      setError('No resume found. Please generate one first.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    // This would trigger PDF generation on backend
    alert('PDF download functionality will be implemented with the backend');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-2xl">Loading resume...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4">
        <div className="glass p-8 rounded-2xl text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
          <button
            onClick={() => navigate('/generate-resume')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Generate Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white hover:text-gray-300 inline-flex items-center"
          >
            ← Back to Dashboard
          </button>
          <div className="flex gap-4">
            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              📥 Download PDF
            </button>
            <button
              onClick={() => navigate('/generate-resume')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-2xl p-12 print:p-0">
          {resume && (
            <>
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {resume.profile?.fullName || 'Your Name'}
                </h1>
                <div className="flex justify-center flex-wrap gap-4 text-gray-600 text-sm">
                  {resume.profile?.email && (
                    <span>✉️ {resume.profile.email}</span>
                  )}
                  {resume.profile?.phone && (
                    <span>📱 {resume.profile.phone}</span>
                  )}
                  {resume.profile?.linkedinUrl && (
                    <span>🔗 LinkedIn</span>
                  )}
                  {resume.profile?.githubUsername && (
                    <span>💻 GitHub: {resume.profile.githubUsername}</span>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              {resume.aiSummary && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{resume.aiSummary}</p>
                </div>
              )}

              {/* Skills */}
              {resume.profile?.skills && resume.profile.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {resume.profile?.experience && resume.profile.experience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Work Experience
                  </h2>
                  {resume.profile.experience.map((exp, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-gray-600 text-sm">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects - AI Enhanced */}
              {resume.enhancedProjects && resume.enhancedProjects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Projects
                  </h2>
                  {resume.enhancedProjects.map((project, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                      </div>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        {project.aiEnhancedDescription || project.originalDescription}
                      </p>
                      {project.technologies && (
                        <p className="text-gray-600 text-sm">
                          <strong>Technologies:</strong> {project.technologies}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resume.profile?.education && resume.profile.education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Education
                  </h2>
                  {resume.profile.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">{edu.year}</p>
                          {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {resume.profile?.certifications && resume.profile.certifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                    Certifications
                  </h2>
                  {resume.profile.certifications.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-gray-700">{cert.issuer}</p>
                        </div>
                        <p className="text-gray-600">{cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Share Section */}
        <div className="glass mt-8 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">📤 Share Your Resume</h3>
          <p className="text-gray-300 mb-4">
            Your portfolio is available at: 
            <span className="text-indigo-400 ml-2 font-mono">
              https://yourapp.com/portfolio/{resume?.profile?.githubUsername || 'username'}
            </span>
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
