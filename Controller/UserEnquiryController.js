import UserEnquiryModel from '../Model/UserEnquiryModel.js';

export const createUserEnquiry = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone,
      eventType, location, eventDate, description
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !eventType || !location || !eventDate) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const enquiry = new UserEnquiryModel({
      firstName, lastName, email, phone,
      eventType, location, eventDate, description
    });

    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await UserEnquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUserEnquiry = async (req, res) => {
  try {
    const deletedEnquiry = await UserEnquiryModel.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ message: 'User enquiry not found' });
    }
    res.status(200).json({ message: 'User enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUserEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, eventType, location, eventDate, description } = req.body;

    const updateFields = { firstName, lastName, email, phone, eventType, location, eventDate, description };

    const updatedEnquiry = await UserEnquiryModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'User enquiry not found' });
    }

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  