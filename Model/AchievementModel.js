import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  }
}, { timestamps: true });

const AchievementModel = mongoose.model('Achievement', AchievementSchema);
export default AchievementModel;