const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');
const { nanoid } = require('nanoid');

const db = monk(process.env.MONGODB_URI);
const urls = db.get('url-shortener');
urls.createIndex({ slug: 1 }, { unique: true });

const createSchema = Joi.object({
  slug: Joi.string().trim().pattern(new RegExp(/[a-z0-9\-_]/i)),
  url: Joi.string().trim().uri().required(),
});

const router = express.Router();

// Create short url
router.post('/create', async (req, res, next) => {
  try {
    const validated = await createSchema.validateAsync(req.body);

    let { slug } = validated;

    if (!slug) {
      slug = nanoid(5);
    } else {
      const slugExists = await urls.findOne({ slug });
      if (slugExists) throw new Error('Slug in use, 🥞');
    }

    slug = slug.toLowerCase();

    const created = await urls.insert({
      url: validated.url,
      slug
    });

    if (created) {
      res.json({ 
        Message: 'Success',
        ...created
      });
    }
  } catch (error) {
    next(error);
  }
});

// Retrieve short url
router.get('/:id', async (req, res) => {
  const { id: slug } = req.params;
  try {
    const url = await urls.findOne({ slug });
    if (url) res.redirect(url.url);
    res.redirect(`/?error=${slug} not found`);
  } catch (error) {
    res.redirect('/?error=Link not found');
  }
});

router.get('/describe/:id', async (req, res) => {
  const { id: slug } = req.params;
  try {
    const url = await urls.findOne({ slug });
    if (url) {
      res.json({
        slug,
        url: url.url,
        isSafe: 'TODO: api response from virus total api'
      });
    }
  } catch (error) {
    res.redirect('/?error=Link not found');
  }
});

module.exports = router;
