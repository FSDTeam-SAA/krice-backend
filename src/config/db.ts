import mongoose from 'mongoose';

export const connectDB = async () => {
      try {
            const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URI;
            if (!mongoUrl) {
                  throw new Error('Missing MongoDB connection string. Set MONGODB_URL in your .env file.');
            }
            await mongoose.connect(mongoUrl);
            console.log('MongoDB connected');
      } catch (error) {
            console.error('MongoDB connection failed:', error);
            process.exit(1);
      }
};
