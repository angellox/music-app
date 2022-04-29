import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Internal Libraries
import connectDB from './config/db.js';
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
// set up CORS Policy
const allowedDomains = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin, cb) {
        if(allowedDomains.indexOf(origin) !== -1) {
            // Origin allowed
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS Policy'));
        }
    }
};
app.use(cors(corsOptions));
// Getting data from APIs
app.use('/api/profiles', profileRoutes);
app.use('/api/songs', songsRoutes);

// Setting up ports for listening to . . .
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Working on port: ${port}`);
});