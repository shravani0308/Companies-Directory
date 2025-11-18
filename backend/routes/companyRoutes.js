import express from 'express';
import Company from '../models/Company.js';

const router = express.Router();

// Get all companies with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      name,
      location,
      industry,
      search,
    } = req.query;

    // Build filter object
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (industry) filter.industry = { $regex: industry, $options: 'i' };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get companies
    const companies = await Company.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Company.countDocuments(filter);

    res.json({
      companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single company
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create company
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get unique values for filters
router.get('/filters/values', async (req, res) => {
  try {
    const locations = await Company.distinct('location');
    const industries = await Company.distinct('industry');
    res.json({ locations, industries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

