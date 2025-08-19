// controllers/achievementController.js
import AchievementModel from '../Model/AchievementModel.js';

// Create
export const createAchievement = async (req, res) => {
  try {
    const { year, description } = req.body;
    const img = req.file?.path?.replace(/\\/g, '/');

    if (!year || !description || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const achievement = new AchievementModel({ year, description, img });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All
export const getAchievements = async (req, res) => {
  try {
    const achievements = await AchievementModel.find().sort({ year: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteAchievement = async (req, res) => {
  try {
    const deleted = await AchievementModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
