import mongoose from 'mongoose';

const connectDB = async () => {
    try {
       const db = await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       }); 

       const conn = `${db.connection.host}:${db.connection.port}`;
       console.log(`MongoDB conectado en ${conn}`);

    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;