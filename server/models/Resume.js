// Resume Model - AI Generated Resume
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  // AI-generated content
  aiSummary: {
    type: String,
  },
  enhancedProjects: [{
    name: String,
    originalDescription: String,
    aiEnhancedDescription: String,
    technologies: String,
  }],
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

module.exports = mongoose.model('Resume', resumeSchema);
