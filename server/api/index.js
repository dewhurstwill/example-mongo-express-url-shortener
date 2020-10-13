// Node Modules
const express = require('express');

// Routes
const urlShortener = require('./url_shortener');

// Express Router
const router = express.Router();

// Consume route in router
router.use('/', urlShortener);

// Export router middleware
module.exports = router;
