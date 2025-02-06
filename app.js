const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

dotenv.config();
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api', (req, res) => {
//   res.write("Hello Bangladesh")
//   });

// Connect to MongoDB
connectDB();

module.exports = app;