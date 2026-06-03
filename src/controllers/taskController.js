import Task from "../models/Task.js";

// Get all tasks for user
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.userId;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Create task
export const createTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description, priority, dueDate } = req.body;

    const task = new Task({
      userId,
      title,
      description,
      priority,
      dueDate,
      status: "todo",
    });

    await task.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // Find task and check ownership
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
      });
    }

    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};