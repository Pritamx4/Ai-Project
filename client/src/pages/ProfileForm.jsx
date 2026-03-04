import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../services/api';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetJobRole: '',
    linkedinUrl: '',
    githubUsername: '',
    portfolioUrl: '',
    
    // Skills
    skills: [''],
    
    // Education
    education: [{
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    }],
    
    // Work Experience
    experience: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }],
    
    // Projects
    projects: [{
      name: '',
      description: '',
      technologies: '',
      url: '',
      githubUrl: ''
    }],
    
    // Certifications
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      credentialUrl: ''
    }]
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle array fields (skills)
  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field, defaultValue = '') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], defaultValue],
    });
  };

  const removeArrayField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Handle object array fields (education, experience, etc.)
  const handleObjectArrayChange = (index, key, value, field) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addObjectField = (field, defaultObject) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], defaultObject],
    });
  };

  const removeObjectField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await profileService.updateProfile(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-gray-300">Fill in your details to generate an amazing resume and portfolio</p>
        </div>

        {/* Messages */}
        {success && (
          <div className="glass mb-6 p-4 rounded-lg border border-green-500 text-green-200">
            ✓ Profile updated successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="glass mb-6 p-4 rounded-lg border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">👤</span> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Job Role *</label>
                <input
                  type="text"
                  name="targetJobRole"
                  required
                  value={formData.targetJobRole}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full Stack Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Username</label>
                <input
                  type="text"
                  name="githubUsername"
                  value={formData.githubUsername}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="johndoe"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">💡</span> Skills
            </h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'skills')}
                  className="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(index, 'skills')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('skills', '')}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Skill
            </button>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🎓</span> Education
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="glass-dark p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleObjectArrayChange(index, 'degree', e.target.value, 'education')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Degree (e.g., B.S. Computer Science)"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleObjectArrayChange(index, 'institution', e.target.value, 'education')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Institution"
                  />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleObjectArrayChange(index, 'year', e.target.value, 'education')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Year (e.g., 2024)"
                  />
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => handleObjectArrayChange(index, 'gpa', e.target.value, 'education')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="GPA (optional)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjectField(index, 'education')}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addObjectField('education', { degree: '', institution: '', year: '', gpa: '' })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Education
            </button>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">💼</span> Work Experience
            </h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="glass-dark p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleObjectArrayChange(index, 'title', e.target.value, 'experience')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleObjectArrayChange(index, 'company', e.target.value, 'experience')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleObjectArrayChange(index, 'location', e.target.value, 'experience')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Location"
                  />
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleObjectArrayChange(index, 'startDate', e.target.value, 'experience')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Start Date"
                  />
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleObjectArrayChange(index, 'endDate', e.target.value, 'experience')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="End Date"
                    disabled={exp.current}
                  />
                  <label className="flex items-center text-white space-x-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleObjectArrayChange(index, 'current', e.target.checked, 'experience')}
                      className="w-4 h-4"
                    />
                    <span>Currently Working</span>
                  </label>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleObjectArrayChange(index, 'description', e.target.value, 'experience')}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Job description and achievements"
                  rows="3"
                />
                <button
                  type="button"
                  onClick={() => removeObjectField(index, 'experience')}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addObjectField('experience', { 
                title: '', company: '', location: '', startDate: '', endDate: '', description: '', current: false 
              })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Experience
            </button>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🚀</span> Projects
            </h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="glass-dark p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleObjectArrayChange(index, 'name', e.target.value, 'projects')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Project Name"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => handleObjectArrayChange(index, 'description', e.target.value, 'projects')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Project Description"
                    rows="2"
                  />
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleObjectArrayChange(index, 'technologies', e.target.value, 'projects')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Technologies Used (comma separated)"
                  />
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => handleObjectArrayChange(index, 'url', e.target.value, 'projects')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Live URL (optional)"
                  />
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) => handleObjectArrayChange(index, 'githubUrl', e.target.value, 'projects')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="GitHub URL (optional)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjectField(index, 'projects')}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addObjectField('projects', { 
                name: '', description: '', technologies: '', url: '', githubUrl: '' 
              })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Project
            </button>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🏆</span> Certifications
            </h2>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="glass-dark p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleObjectArrayChange(index, 'name', e.target.value, 'certifications')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Certification Name"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleObjectArrayChange(index, 'issuer', e.target.value, 'certifications')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Issuing Organization"
                  />
                  <input
                    type="month"
                    value={cert.date}
                    onChange={(e) => handleObjectArrayChange(index, 'date', e.target.value, 'certifications')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Date"
                  />
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) => handleObjectArrayChange(index, 'credentialUrl', e.target.value, 'certifications')}
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-400 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Credential URL (optional)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjectField(index, 'certifications')}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Remove Certification
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addObjectField('certifications', { 
                name: '', issuer: '', date: '', credentialUrl: '' 
              })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Certification
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
