// Resume Routes
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authenticate = require('../middleware/auth');

// All routes are protected
router.use(authenticate);

router.post('/generate', resumeController.generateResume);
router.get('/', resumeController.getResume);
router.put('/', resumeController.updateResume);
router.delete('/', resumeController.deleteResume);

module.exports = router;
