import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import artistRoutes from './routes/artistRoutes.js';

const app = express();
// Body parser
app.use(express.json());
// Reading enviroment vars
dotenv.config();
// Connection to MongoDB
connectDB();
// Getting data from API
app.use('/api/artists', artistRoutes);

// Setting up ports for listening to . . .
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Working on port: ${port}`);
});