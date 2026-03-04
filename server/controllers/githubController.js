// GitHub Integration Controller
const axios = require('axios');
const Profile = require('../models/Profile');

/**
 * Fetch user's GitHub repositories
 * GET /api/github/repos/:username
 */
exports.fetchRepos = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'GitHub username is required' });
    }

    // Fetch repos from GitHub API
    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: 100,
        },
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    );

    // Filter and format repos
    const repos = githubResponse.data
      .filter(repo => !repo.fork) // Exclude forked repos
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description provided',
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }))
      .sort((a, b) => b.stars - a.stars) // Sort by stars
      .slice(0, 10); // Get top 10

    // Update profile with GitHub repos
    await Profile.findOneAndUpdate(
      { userId: req.userId },
      { githubRepos: repos, githubUsername: username }
    );

    res.json({
      message: 'GitHub repositories fetched successfully',
      repos,
    });
  } catch (error) {
    console.error('GitHub fetch error:', error);

    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'GitHub user not found' });
    }

    if (error.response?.status === 403) {
      return res.status(403).json({ message: 'GitHub API rate limit exceeded' });
    }

    res.status(500).json({ message: 'Error fetching GitHub repositories' });
  }
};

/**
 * Connect GitHub account
 * POST /api/github/connect
 */
exports.connectGithub = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    if (!githubUsername) {
      return res.status(400).json({ message: 'GitHub username is required' });
    }

    // Verify GitHub user exists
    try {
      await axios.get(`https://api.github.com/users/${githubUsername}`);
    } catch (error) {
      return res.status(404).json({ message: 'GitHub user not found' });
    }

    // Update profile
    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { githubUsername },
      { new: true }
    );

    res.json({
      message: 'GitHub account connected successfully',
      profile,
    });
  } catch (error) {
    console.error('GitHub connect error:', error);
    res.status(500).json({ message: 'Error connecting GitHub account' });
  }
};

/**
 * Get GitHub user info
 * GET /api/github/user/:username
 */
exports.getGithubUser = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        : {},
    });

    const userData = {
      username: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
      publicRepos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following,
    };

    res.json(userData);
  } catch (error) {
    console.error('GitHub user fetch error:', error);

    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'GitHub user not found' });
    }

    res.status(500).json({ message: 'Error fetching GitHub user info' });
  }
};
