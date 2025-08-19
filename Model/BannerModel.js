// models/BannerModel.js
import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const BannerModel = mongoose.model('Banner', BannerSchema);
export default BannerModel;
