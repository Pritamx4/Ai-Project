// Portfolio Controller
const Profile = require('../models/Profile');
const Resume = require('../models/Resume');

/**
 * Generate portfolio data
 * POST /api/portfolio/generate
 */
exports.generatePortfolio = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Please complete your profile first' });
    }

    const resume = await Resume.findOne({ userId: req.userId });

    const portfolioData = {
      profile: {
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        targetJobRole: profile.targetJobRole,
        githubUsername: profile.githubUsername,
        linkedinUrl: profile.linkedinUrl,
      },
      summary: resume?.aiSummary || 'Professional software developer',
      skills: profile.skills,
      projects: profile.projects,
      githubRepos: profile.githubRepos,
      experience: profile.experience,
      education: profile.education,
      certifications: profile.certifications,
      portfolioUrl: `${req.protocol}://${req.get('host')}/portfolio/${profile.githubUsername || profile._id}`,
    };

    res.json({
      message: 'Portfolio generated successfully',
      portfolio: portfolioData,
    });
  } catch (error) {
    console.error('Generate portfolio error:', error);
    res.status(500).json({ message: 'Error generating portfolio' });
  }
};

/**
 * Get public portfolio by username
 * GET /api/portfolio/:username
 */
exports.getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({ githubUsername: username });

    if (!profile) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const resume = await Resume.findOne({ userId: profile.userId });

    const portfolioData = {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      targetJobRole: profile.targetJobRole,
      githubUsername: profile.githubUsername,
      linkedinUrl: profile.linkedinUrl,
      summary: resume?.aiSummary || 'Professional software developer',
      skills: profile.skills,
      projects: profile.projects,
      githubRepos: profile.githubRepos,
      experience: profile.experience,
      education: profile.education,
      certifications: profile.certifications,
    };

    res.json(portfolioData);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};
