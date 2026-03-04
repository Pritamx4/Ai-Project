// Profile Controller
const Profile = require('../models/Profile');

/**
 * Get user profile
 * GET /api/profile
 */
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update user profile
 * PUT /api/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const profileData = req.body;

    // Find and update profile
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = new Profile({
        userId: req.userId,
        ...profileData,
      });
    } else {
      // Update existing profile
      Object.assign(profile, profileData);
      profile.updatedAt = new Date();
    }

    await profile.save();

    res.json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

/**
 * Delete user profile
 * DELETE /api/profile
 */
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.userId });

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
