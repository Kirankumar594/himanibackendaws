import express from 'express';
import { createCategoryDetail, getCategoryDetails,deleteCategoryDetail,updateCategoryDetail } from '../Controller/CategoryDetailController.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createCategoryDetail);
router.delete('/:id', deleteCategoryDetail);
router.put('/:id', upload.single('image'), updateCategoryDetail);

router.get('/', getCategoryDetails);

export default router;
