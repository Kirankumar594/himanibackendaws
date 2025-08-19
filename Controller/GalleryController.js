import GalleryModel from '../Model/Gallery.js';
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
export const createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;
    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    if (!image || !title || !category) {
      if (req.file) deleteImageFile(image);
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new GalleryModel({ title, category, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    if (req.file) {
      deleteImageFile(`/uploads/banners/${req.file.filename}`);
    }
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
export const getAllGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const items = await GalleryModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
export const getGalleryItem = async (req, res) => {
  try {
    const item = await GalleryModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    deleteImageFile(item.image);
    await GalleryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;

    const item = await GalleryModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    let imagePath;
    if (req.file) {
      deleteImageFile(item.image);
      imagePath = `/uploads/banners/${req.file.filename}`;
    } else {
      imagePath = item.image;
    }

    const updatedItem = await GalleryModel.findByIdAndUpdate(
      req.params.id,
      { title, category, image: imagePath },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    if (req.file) {
      deleteImageFile(`/uploads/banners/${req.file.filename}`);
    }
    res.status(500).json({ message: error.message });
  }
};
