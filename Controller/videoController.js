import Video from "../Model/videoModel.js";
import fs from "fs";
import path from "path";

export const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const video = req.file.filename;

    const newVideo = new Video({ title, video });
    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: "Video upload failed" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // delete file from uploads folder
    const filePath = path.join("uploads/videos", video.video);
    fs.unlinkSync(filePath);

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};
