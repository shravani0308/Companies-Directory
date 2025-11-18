import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/Company.js';

dotenv.config();

const companies = [
  {
    name: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    industry: 'Technology',
    description: 'Leading provider of enterprise software solutions',
    website: 'https://techcorp.com',
    employees: 500,
    founded: 2010,
  },
  {
    name: 'Green Energy Inc',
    location: 'Austin, TX',
    industry: 'Energy',
    description: 'Renewable energy solutions for sustainable future',
    website: 'https://greenenergy.com',
    employees: 250,
    founded: 2015,
  },
  {
    name: 'HealthCare Plus',
    location: 'Boston, MA',
    industry: 'Healthcare',
    description: 'Innovative healthcare technology and services',
    website: 'https://healthcareplus.com',
    employees: 1200,
    founded: 2008,
  },
  {
    name: 'FinanceHub',
    location: 'New York, NY',
    industry: 'Finance',
    description: 'Digital banking and financial services platform',
    website: 'https://financehub.com',
    employees: 800,
    founded: 2012,
  },
  {
    name: 'EduTech Innovations',
    location: 'Seattle, WA',
    industry: 'Education',
    description: 'Online learning platforms and educational tools',
    website: 'https://edutech.com',
    employees: 300,
    founded: 2017,
  },
  {
    name: 'RetailMax',
    location: 'Chicago, IL',
    industry: 'Retail',
    description: 'E-commerce solutions and retail management',
    website: 'https://retailmax.com',
    employees: 600,
    founded: 2011,
  },
  {
    name: 'MediaStream',
    location: 'Los Angeles, CA',
    industry: 'Media',
    description: 'Digital media production and streaming services',
    website: 'https://mediastream.com',
    employees: 450,
    founded: 2014,
  },
  {
    name: 'AutoDrive Systems',
    location: 'Detroit, MI',
    industry: 'Automotive',
    description: 'Autonomous vehicle technology and solutions',
    website: 'https://autodrive.com',
    employees: 900,
    founded: 2016,
  },
  {
    name: 'FoodTech Solutions',
    location: 'Portland, OR',
    industry: 'Food & Beverage',
    description: 'Food delivery and restaurant technology',
    website: 'https://foodtech.com',
    employees: 350,
    founded: 2018,
  },
  {
    name: 'RealEstate Pro',
    location: 'Miami, FL',
    industry: 'Real Estate',
    description: 'Property management and real estate technology',
    website: 'https://realestatepro.com',
    employees: 200,
    founded: 2013,
  },
  {
    name: 'CloudSync Technologies',
    location: 'San Francisco, CA',
    industry: 'Technology',
    description: 'Cloud infrastructure and data synchronization',
    website: 'https://cloudsync.com',
    employees: 700,
    founded: 2015,
  },
  {
    name: 'BioPharm Research',
    location: 'Boston, MA',
    industry: 'Healthcare',
    description: 'Biopharmaceutical research and development',
    website: 'https://biopharm.com',
    employees: 1500,
    founded: 2005,
  },
  {
    name: 'TravelWise',
    location: 'Denver, CO',
    industry: 'Travel',
    description: 'Travel booking platform and services',
    website: 'https://travelwise.com',
    employees: 400,
    founded: 2016,
  },
  {
    name: 'SportsTech',
    location: 'Atlanta, GA',
    industry: 'Sports',
    description: 'Sports analytics and performance technology',
    website: 'https://sportstech.com',
    employees: 180,
    founded: 2019,
  },
  {
    name: 'LegalEase',
    location: 'Washington, DC',
    industry: 'Legal',
    description: 'Legal technology and document management',
    website: 'https://legalease.com',
    employees: 320,
    founded: 2014,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    console.log('Cleared existing companies');

    // Insert seed data
    await Company.insertMany(companies);
    console.log(`Inserted ${companies.length} companies`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

