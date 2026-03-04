// Portfolio Routes
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authenticate = require('../middleware/auth');

// Protected route
router.post('/generate', authenticate, portfolioController.generatePortfolio);

// Public route - anyone can view portfolio
router.get('/:username', portfolioController.getPortfolio);

module.exports = router;
