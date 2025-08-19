import BannerModel from "../Model/BannerModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, '../..', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// CREATE
export const createBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const img = req.file ? `/uploads/banners/${req.file.filename}` : null;

    if (!img || !title || !description) {
      if (req.file) {
        deleteImageFile(img);
      }
      return res.status(400).json({ message: 'All fields are required' });
    }

    const banner = new BannerModel({ img, title, description });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    if (req.file) {
      deleteImageFile(`/uploads/banners/${req.file.filename}`);
    }
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
export const getBanners = async (req, res) => {
  try {
    const banners = await BannerModel.find().lean();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    deleteImageFile(banner.img);
    await BannerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imgPath;

    const banner = await BannerModel.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Handle image update
    if (req.file) {
      // Delete old image
      deleteImageFile(banner.img);
      imgPath = `/uploads/banners/${req.file.filename}`;
    } else {
      // Keep existing image if no new one provided
      imgPath = banner.img;
    }

    const updatedBanner = await BannerModel.findByIdAndUpdate(
      req.params.id,
      { title, description, img: imgPath },
      { new: true }
    );

    res.status(200).json(updatedBanner);
  } catch (error) {
    if (req.file) {
      deleteImageFile(`/uploads/banners/${req.file.filename}`);
    }
    res.status(500).json({ message: error.message });
  }
};