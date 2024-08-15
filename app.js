require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests
app.use('/api', authRoutes);  // Auth routes
app.use('/api/tasks', taskRoutes); // Task routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
