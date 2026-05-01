const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('MongoDB URI is not configured. Set MONGO_URI or MONGODB_URI.');
    process.exit(1);
  }

  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI not set — skipping MongoDB connection (dev only).');
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
