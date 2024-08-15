const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;
  const userId = req.user.userId;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
      user_id: userId,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const tasks = await Task.find({ user_id: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority, due_date } = req.body;
  const userId = req.user.userId;

  try {
    const task = await Task.findOne({ _id: taskId, user_id: userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.due_date = due_date || task.due_date;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;

  try {
    const result = await Task.deleteOne({ _id: taskId, user_id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error during task deletion:', error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};