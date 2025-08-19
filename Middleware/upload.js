import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define folder path
const folder = 'uploads/banners';

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `banner-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter (optional, restrict to image files only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
  }
};

// ✅ Correct: Multer instance with storage, file size limit, and file type check
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

// Export
export const uploadSingle = upload.single('img');
export default upload;
