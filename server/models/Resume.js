// Resume Model - AI Generated Professional Resume
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Original profile data (reference data)
  profile: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  
  // AI-generated professional content
  aiSummary: {
    type: String,
    required: false,
  },
  
  professionalSkills: {
    type: String,
    required: false,
  },
  
  enhancedExperience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String, // AI-enhanced description
    originalDescription: String, // Original user input
  }],
  
  enhancedProjects: [{
    name: String,
    description: String, // AI-enhanced description
    originalDescription: String, // Original user input
    technologies: String,
    url: String,
    githubUrl: String,
  }],
  
  enhancedCertifications: [{
    name: String,
    enhancedName: String, // AI-enhanced with context
    issuer: String,
    date: String,
    credentialUrl: String,
  }],
  
  contactInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedinUrl: String,
    githubUsername: String,
    portfolioUrl: String,
  },
  
  atsKeywords: [String],
  
  // Resume metadata
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

// Index for faster queries
resumeSchema.index({ userId: 1 });

module.exports = mongoose.model('Resume', resumeSchema);
