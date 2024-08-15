const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');  // Ensure this path is correct
const User = require('../models/user');

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  console.log('Register route hit');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};




