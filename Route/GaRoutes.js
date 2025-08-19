import express from 'express';
import multer from 'multer';
import {
 createGalleryItem,
 getAllGalleryItems,
  getGalleryItem,
  deleteGalleryItem,
  updateGalleryItem,
} from '../Controller/GalleryController.js'

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/banners'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createGalleryItem);
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItem);
router.put('/:id', upload.single('image'), updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
