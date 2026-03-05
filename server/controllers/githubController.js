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
 * Connect GitHub account and auto-populate projects
 * POST /api/github/connect
 */
exports.connectGithub = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    if (!githubUsername) {
      return res.status(400).json({ message: 'GitHub username is required' });
    }

    // Verify GitHub user exists
    let githubUser;
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${githubUsername}`, {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      });
      githubUser = userResponse.data;
    } catch (error) {
      return res.status(404).json({ message: 'GitHub user not found' });
    }

    // Fetch user's repositories
    const reposResponse = await axios.get(
      `https://api.github.com/users/${githubUsername}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: 100,
          type: 'owner', // Only repos owned by user
        },
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    );

    // Filter repos: not forked, has description, preferably with homepage
    const eligibleRepos = reposResponse.data
      .filter(repo => !repo.fork && !repo.private)
      .map(repo => ({
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        homepage: repo.homepage || '',
        language: repo.language || 'N/A',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        hasHomepage: !!repo.homepage,
      }))
      // Sort by: has homepage first, then by stars, then by updated date
      .sort((a, b) => {
        if (a.hasHomepage && !b.hasHomepage) return -1;
        if (!a.hasHomepage && b.hasHomepage) return 1;
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .slice(0, 10); // Get top 10 repos

    // Convert repos to project format
    const autoProjects = eligibleRepos.map(repo => ({
      name: repo.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '), // Convert "my-project" to "My Project"
      description: repo.description || `A ${repo.language || 'software'} project`,
      technologies: repo.language || 'Various technologies',
      url: repo.homepage || '', // Live link
      githubUrl: repo.url,
    }));

    // Save GitHub repos to profile
    const githubRepos = eligibleRepos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      language: repo.language,
      stars: repo.stars,
      forks: repo.forks,
    }));

    // Get current profile
    const profile = await Profile.findOne({ userId: req.userId });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Merge auto projects with existing projects (avoid duplicates)
    const existingProjectNames = profile.projects.map(p => p.name.toLowerCase());
    const newProjects = autoProjects.filter(
      p => !existingProjectNames.includes(p.name.toLowerCase())
    );

    // Update profile
    profile.githubUsername = githubUsername;
    profile.githubRepos = githubRepos;
    profile.projects = [...profile.projects, ...newProjects];
    
    await profile.save();

    res.json({
      message: 'GitHub account connected successfully',
      projectsAdded: newProjects.length,
      projects: newProjects,
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
