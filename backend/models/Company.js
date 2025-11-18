import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  employees: {
    type: Number,
    default: 0,
  },
  founded: {
    type: Number,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Company', companySchema);

