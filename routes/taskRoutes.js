const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController'); // Verify this path

const authMiddleware = require('../middleware/authMiddleware'); // Verify this path

const router = express.Router();

// Ensure that these functions are correctly defined and imported
router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
