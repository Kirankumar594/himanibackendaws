import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'all',
      'Corporate Events',
      'Product Launches',
      'Concerts',
      'Stall & Exhibitions',
      'Movie Promotions',
      'Vehicle Launches',
      'Conferences and Seminars',
    ],
    default: 'all',
  },
}, { timestamps: true });

const GalleryModel = mongoose.model('Gallery', GallerySchema);
export default GalleryModel;