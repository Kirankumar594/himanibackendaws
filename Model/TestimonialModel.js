import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  feedback: {
    type: String,
    required: true,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, { timestamps: true });

const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema);
export default TestimonialModel;
