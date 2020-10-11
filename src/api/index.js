const express = require('express');

const urlShortener = require('./url_shortener');

const router = express.Router();

router.use('/', urlShortener);

module.exports = router;
