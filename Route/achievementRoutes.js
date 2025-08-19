// Route/BannerRoute.js
import express from 'express';
import { createAchievement, getAchievements, deleteAchievement } from '../Controller/achievementController.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

// Make sure these controller functions/ exist and are properly imported
router.post('/', upload.single('img'), createAchievement);
router.get('/', getAchievements);
router.delete('/:id', deleteAchievement);

export default router;