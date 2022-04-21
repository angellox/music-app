import express from "express";
import dotenv from 'dotenv';
// Internal Libraries
import connectDB from "./config/db.js";
// Routes
import profileRoutes from './routes/profileRoutes.js';
import songsRoutes from './routes/songsRoutes.js';

const app = express();
// Body parser
app.use(express.json());
// Reading enviroment vars
dotenv.config();
// Connection to MongoDB
connectDB();
// Getting data from APIs
app.use('/api/profiles', profileRoutes);
app.use('/api/songs', songsRoutes);

// Setting up ports for listening to . . .
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Working on port: ${port}`);
});