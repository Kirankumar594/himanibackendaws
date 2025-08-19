import TestimonialModel from '../Model/TestimonialModel.js';

export const createTestimonial = async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;
    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    if (!name || !feedback || !rating || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTestimonial = new TestimonialModel({ name, feedback, image, rating });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().lean();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;
    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    const updateFields = { name, feedback, rating };
    if (image) updateFields.image = image;

    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};