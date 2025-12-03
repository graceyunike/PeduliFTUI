import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/usersRoutes.js';
import campaignRoutes from './routes/donationCampaignsRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import timelinePostsRoutes from './routes/timelinePostsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";


const app = express();

// middleware - Enable CORS manually
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/users', userRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/donations', donationRoutes);
app.use('/timeline-posts', timelinePostsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/auth', authRoutes);
app.use("/payments", paymentRoutes);


app.get('/', (req, res) => {
    res.send('Hello From Node API Server Updated');
});

if (!process.env.MONGODB_URI) {
    console.error("❌ Missing MONGODB_URI in .env file");
    process.exit(1);
}


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });