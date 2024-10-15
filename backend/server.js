import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import cors from 'cors';

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    const app = express();

    app.use(cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }));

    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/jobs', jobRoutes);

    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

startServer().catch(error => {
  console.error('Error starting the server:', error.message);
});
