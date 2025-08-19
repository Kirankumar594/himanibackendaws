import express from 'express';
import { createTestimonial, getTestimonials, deleteTestimonial, updateTestimonial } from '../Controller/TestimonialController.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createTestimonial);
router.delete('/:id', deleteTestimonial);
router.put('/:id', upload.single('image'), updateTestimonial);

router.get('/', getTestimonials);

export default router;
