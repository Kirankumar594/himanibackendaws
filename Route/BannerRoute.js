import express from 'express';
import { uploadSingle } from '../Middleware/upload.js';
import {
  createBanner,
  getBanners,
  deleteBanner,
  updateBanner
} from '../Controller/BannerController.js';

const router = express.Router();

// Use the uploadSingle middleware directly
router.post('/', uploadSingle, createBanner);
router.get('/', getBanners);
router.delete('/:id', deleteBanner);
router.put('/:id', uploadSingle, updateBanner);

export default router;