import mongoose from 'mongoose';

const allowedCategories = [
  'Corporate Events',
  'Product Launches',
  'Vehicle Launches',
  'Movie Promotions',
  'Stall & Exhibitions',
  'Concerts',
  'Conferences and Seminars', 
];

const CategoryDetailSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    enum: allowedCategories,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description1: {
    type: String,
    required: true
  },
  description2: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const CategoryDetailModel = mongoose.model('CategoryDetail', CategoryDetailSchema);
export default CategoryDetailModel;
