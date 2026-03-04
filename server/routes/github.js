// GitHub Routes
const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const authenticate = require('../middleware/auth');

// All routes are protected
router.use(authenticate);

router.get('/repos/:username', githubController.fetchRepos);
router.post('/connect', githubController.connectGithub);
router.get('/user/:username', githubController.getGithubUser);

module.exports = router;
