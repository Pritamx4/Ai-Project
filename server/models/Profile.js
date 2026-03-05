// Profile Model - User detailed information
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  targetJobRole: String,
  linkedinUrl: String,
  githubUsername: String,
  portfolioUrl: String,

  // Skills array
  skills: [String],

  // Education array
  education: [{
    degree: String,
    institution: String,
    year: String,
    gpa: String,
  }],

  // Work Experience array
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
    current: Boolean,
  }],

  // Projects array
  projects: [{
    name: String,
    description: String,
    technologies: String,
    url: String,
    githubUrl: String,
  }],

  // Certifications array
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    credentialUrl: String,
  }],

  // GitHub repositories (auto-fetched)
  githubRepos: [{
    name: String,
    description: String,
    url: String,
    language: String,
    stars: Number,
    forks: Number,
  }],

  // Profile completion status
  isComplete: {
    type: Boolean,
    default: false,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Update isComplete status based on filled fields
profileSchema.pre('save', function () {
  const requiredFields = ['fullName', 'email', 'targetJobRole'];
  const hasRequiredFields = requiredFields.every(field => this[field]);
  const hasSkills = this.skills && this.skills.length > 0;
  const hasEducation = this.education && this.education.length > 0;
  
  this.isComplete = hasRequiredFields && hasSkills && hasEducation;
});

module.exports = mongoose.model('Profile', profileSchema);
