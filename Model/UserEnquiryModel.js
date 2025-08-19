import mongoose from 'mongoose';

const UserEnquirySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/
  },
  phone: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      'Wedding',
      'Corporate',
      'Birthday',
      'Concert',
      'Seminar',
      'Exhibition',
      'Other'
    ]
  },
  location: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

const UserEnquiryModel = mongoose.model('UserEnquiry', UserEnquirySchema);
export default UserEnquiryModel;
