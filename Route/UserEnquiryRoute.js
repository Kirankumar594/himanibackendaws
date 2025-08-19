import express from 'express';
import { createUserEnquiry, getUserEnquiries, deleteUserEnquiry, updateUserEnquiry } from '../Controller/UserEnquiryController.js';

const router = express.Router();

router.post('/', createUserEnquiry);
router.get('/', getUserEnquiries);
router.delete('/:id', deleteUserEnquiry);
router.put('/:id', updateUserEnquiry);

export default router;


