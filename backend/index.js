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
app.use(express.static('public'));
// Reading enviroment vars
dotenv.config();
// Connection to MongoDB
connectDB();
// set up CORS Policy
const policyCors = () => {
    const allowedDomains = [process.env.FRONTEND_URL];
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
}
// Comment this line for postman testings
policyCors();
// Getting data from APIs
app.use('/api/profiles', profileRoutes);
app.use('/api/songs', songsRoutes);

// Setting up ports for listening to . . .
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Working on port: ${port}`);
});