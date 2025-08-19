import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import galleryRoutes from './Route/GaRoutes.js';

// Route imports
import achievementRoutes from './Route/achievementRoutes.js';
import BannerRoute from './Route/BannerRoute.js';
import ClientRoute from './Route/ClientRoute.js';
// import GalleryRoute from './Route/GalleryRoute.js';
import TestimonialRoute from './Route/TestimonialRoute.js';
import UserEnquiryRoute from './Route/UserEnquiryRoute.js'; 
import CategoryDetailRoute from './Route/CategoryDetailRoute.js'; 
import videoRoutes from './Route/videoRoutes.js';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Env config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/banner', BannerRoute);
app.use('/api/achievements', achievementRoutes);
app.use('/api/clients', ClientRoute);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', TestimonialRoute);
app.use('/api/enquiries', UserEnquiryRoute);
app.use('/api/categorydetails', CategoryDetailRoute);
app.use('/api/videos', videoRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB connection (cleaned)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
