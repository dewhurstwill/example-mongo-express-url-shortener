// Node Modules
const express = require('express');
const monk = require('monk');
const { nanoid } = require('nanoid');
const Joi = require('@hapi/joi');
const rateLimit = require('express-rate-limit');

// MongoDB Connection
const db = monk(process.env.MONGODB_URI);
const urls = db.get('url-shortener');
urls.createIndex({ slug: 1 }, { unique: true });

// Joi Schema
const createSchema = Joi.object({
  // Validate Slug
  // Must be a string, not null
  // and follow RegEx Pattern (a to z, 0 to 9, _ or -, case insensitive)
  slug: Joi.string().trim().pattern(new RegExp(/[a-z0-9\-_]/i)),
  // Validate Url
  // Must be a string, not null, must be a uri and is required
  url: Joi.string().trim().uri().required(),
});

// Express Router
const router = express.Router();

// Create Limiter
const createApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5
});

// Create short url
router.post('/create', createApiLimiter, async (req, res, next) => {
  try {
    // Validate Request Body
    const validated = await createSchema.validateAsync(req.body);
    // Deconstruct slug from the validated body
    let { slug } = validated;
    // If not slug
    if (!slug) {
      slug = nanoid(5); // Generate an ID to use as a slug
    } else {
      // Check if the user provided slug exists in the database
      const slugExists = await urls.findOne({ slug });
      // If slug exists, throw an error
      if (slugExists) throw new Error('Slug in use, 🥞');
    }
    // Convert slug to a lowercase string
    slug = slug.toLowerCase();
    // Insert url into the database with the slug
    const created = await urls.insert({
      url: validated.url,
      slug
    });
    // If record creation successful, return http200
    if (created) {
      res.json({
        message: 'Success',
        ...created
      });
    }
  } catch (error) {
    // Handle error
    next(error);
  }
});

// Retrieve short url
router.get('/:id', async (req, res) => {
  // Deconstruct the ID from the url params,
  // save it as a variable called slug
  const { id: slug } = req.params;
  try {
    // Find the slug in the database
    const url = await urls.findOne({ slug });
    // If record exists, redirect to the saved url
    if (url) res.status(301).redirect(url.url);
    // If record not found, redirect to the error page
    res.status(301).redirect(`/?error=${slug} not found`);
  } catch (error) {
    // Handle error
    return res.status(301).redirect('/?error=Link not found');
  }
});

// Describe short url
router.get('/describe/:id', async (req, res) => {
  // Deconstruct the ID from the url params,
  // save it as a variable called slug
  const { id: slug } = req.params;
  try {
    // Find the slug in the database
    const url = await urls.findOne({ slug });
    // If record exists, return details to the user
    if (url) {
      res.json({
        slug,
        url: url.url,
        isSafe: 'TODO: api response from virus total api'
      });
    }
  } catch (error) {
    // Handle error
    return res.redirect('/?error=Link not found');
  }
});

module.exports = router;
