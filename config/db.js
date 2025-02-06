const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log('Mongo URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    // console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;