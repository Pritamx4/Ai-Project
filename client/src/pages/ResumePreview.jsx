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
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="text-2xl text-white">Loading resume...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-dark-bg">
        <div className="max-w-md p-8 text-center glass rounded-2xl">
          <div className="mb-4 text-6xl">📄</div>
          <h2 className="mb-4 text-2xl font-bold text-white">{error}</h2>
          <button
            onClick={() => navigate('/generate-resume')}
            className="px-6 py-3 font-semibold text-white transition bg-dark-hover border border-dark-border rounded-lg hover:bg-dark-card"
          >
            Generate Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-dark-bg sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 transition bg-dark-surface border border-dark-border rounded-lg hover:bg-dark-hover"
          >
            ← Back to Dashboard
          </button>
          <div className="flex gap-3">
            <button
              onClick={downloadPDF}
              className="px-5 py-2 text-sm font-medium text-white transition bg-dark-hover border border-dark-border rounded-lg hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              Download PDF
            </button>
            <button
              onClick={() => navigate('/generate-resume')}
              className="px-5 py-2 text-sm font-medium text-white transition bg-dark-hover border border-dark-border rounded-lg hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Resume Preview Container - A4 Style */}
        <div className="mx-auto max-w-[850px] bg-white shadow-lg rounded-sm overflow-hidden">
          <div className="px-12 py-10">
            {/* AI Enhancement Badge */}
            {resume && (resume.enhancedProjects || resume.enhancedExperience) && (
              <div className="px-4 py-3 mb-8 border-l-4 border-indigo-500 rounded-r-md bg-indigo-50 print:hidden">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <h3 className="text-sm font-semibold text-indigo-900">AI-Enhanced Resume</h3>
                    <p className="text-xs text-indigo-700">
                      Professionally optimized for ATS systems
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {resume && (
              <>
                {/* Header Section */}
                <header className="pb-6 mb-8 text-center border-b-2 border-gray-900">
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
                    {resume.contactInfo?.fullName || resume.profile?.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                    {(resume.contactInfo?.email || resume.profile?.email) && (
                      <a 
                        href={`mailto:${resume.contactInfo?.email || resume.profile?.email}`}
                        className="transition hover:text-indigo-600"
                      >
                        {resume.contactInfo?.email || resume.profile?.email}
                      </a>
                    )}
                    {(resume.contactInfo?.phone || resume.profile?.phone) && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span>{resume.contactInfo?.phone || resume.profile?.phone}</span>
                      </>
                    )}
                    {(resume.contactInfo?.githubUsername || resume.profile?.githubUsername) && (
                      <>
                        <span className="text-gray-400">•</span>
                        <a 
                          href={`https://github.com/${resume.contactInfo?.githubUsername || resume.profile?.githubUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-indigo-600"
                        >
                          github.com/{resume.contactInfo?.githubUsername || resume.profile?.githubUsername}
                        </a>
                      </>
                    )}
                    {(resume.contactInfo?.linkedinUrl || resume.profile?.linkedinUrl) && (
                      <>
                        <span className="text-gray-400">•</span>
                        <a 
                          href={resume.contactInfo?.linkedinUrl || resume.profile?.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-indigo-600"
                        >
                          LinkedIn
                        </a>
                      </>
                    )}
                    {(resume.contactInfo?.portfolioUrl || resume.profile?.portfolioUrl) && (
                      <>
                        <span className="text-gray-400">•</span>
                        <a 
                          href={resume.contactInfo?.portfolioUrl || resume.profile?.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-indigo-600"
                        >
                          Portfolio
                        </a>
                      </>
                    )}
                  </div>
                </header>

                {/* Professional Summary */}
                {resume.aiSummary && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-700">{resume.aiSummary}</p>
                  </section>
                )}

                {/* Skills Section */}
                {(resume.professionalSkills || (resume.profile?.skills && resume.profile.skills.length > 0)) && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Technical Skills
                    </h2>
                    {resume.professionalSkills ? (
                      <p className="text-sm leading-relaxed text-gray-700">{resume.professionalSkills}</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {resume.profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* Projects Section */}
                {resume.enhancedProjects && resume.enhancedProjects.length > 0 && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Projects
                    </h2>
                    <div className="space-y-6">
                      {resume.enhancedProjects.map((project, index) => (
                        <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                            <div className="flex gap-2 ml-4">
                              {project.url && (
                                <a 
                                  href={project.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 text-xs font-medium text-indigo-600 transition border border-indigo-600 rounded hover:bg-indigo-50"
                                >
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a 
                                  href={project.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 text-xs font-medium text-gray-700 transition border border-gray-300 rounded hover:bg-gray-50"
                                >
                                  GitHub
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="mb-3 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                            {project.description || project.aiEnhancedDescription || project.originalDescription}
                          </div>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.split(',').map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Work Experience Section */}
                {((resume.enhancedExperience && resume.enhancedExperience.length > 0) || 
                  (resume.profile?.experience && resume.profile.experience.length > 0)) && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Experience
                    </h2>
                    <div className="space-y-6">
                      {(resume.enhancedExperience || resume.profile.experience).map((exp, index) => (
                        <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900">{exp.title}</h3>
                              <p className="text-sm text-gray-600">
                                {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {exp.startDate} - {exp.current ? 'Present' : (exp.endDate || 'N/A')}
                            </span>
                          </div>
                          <div className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                            {exp.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education Section */}
                {resume.profile?.education && resume.profile.education.length > 0 && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Education
                    </h2>
                    <div className="space-y-4">
                      {resume.profile.education.map((edu, index) => (
                        <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                              <p className="text-sm text-gray-600">{edu.institution}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">{edu.year}</p>
                              {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                            </div>
                          </div>
                          {edu.coursework && (
                            <p className="mt-1 text-xs text-gray-600">
                              <strong>Relevant Coursework:</strong> {edu.coursework}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications Section */}
                {((resume.enhancedCertifications && resume.enhancedCertifications.length > 0) ||
                  (resume.profile?.certifications && resume.profile.certifications.length > 0)) && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Certifications
                    </h2>
                    <div className="space-y-3">
                      {(resume.enhancedCertifications || resume.profile.certifications).map((cert, index) => (
                        <div key={index} className="flex items-start justify-between pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {cert.enhancedName || cert.name}
                            </h3>
                            {cert.issuer && <p className="text-xs text-gray-600">{cert.issuer}</p>}
                            {cert.credentialUrl && (
                              <a 
                                href={cert.credentialUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-1 text-xs text-indigo-600 transition hover:text-indigo-800"
                              >
                                View Credential →
                              </a>
                            )}
                          </div>
                          {cert.date && <p className="text-xs text-gray-500 whitespace-nowrap">{cert.date}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Achievements Section (if available in profile) */}
                {resume.profile?.achievements && resume.profile.achievements.length > 0 && (
                  <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold tracking-wide text-gray-900 uppercase">
                      Achievements
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                      {resume.profile.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        </div>

        {/* Share Section */}
        <div className="max-w-[850px] mx-auto mt-6 px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Share Your Resume</h3>
              <p className="text-xs text-gray-600">
                Portfolio link: 
                <span className="ml-2 font-mono text-indigo-600">
                  yourapp.com/{resume?.profile?.githubUsername || 'username'}
                </span>
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 transition border border-indigo-600 rounded hover:bg-indigo-50">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
