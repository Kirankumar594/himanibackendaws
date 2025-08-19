import express from "express";
import { uploadVideo, getAllVideos, deleteVideo } from "../Controller/videoController.js";
import { videoUpload } from "../Middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", videoUpload.single("video"), uploadVideo);
router.get("/", getAllVideos);
router.delete("/:id", deleteVideo);

export default router;
