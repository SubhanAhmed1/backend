import ErrorHandler from '../middleware/error.js';
import { Task } from '../model/tasks.js';
import { Project } from '../model/project.js';  // Ensure Project model is imported

export const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedEmployees = [], project, dueDate } = req.body;

    // Ensure assignedEmployees is an array of valid ObjectId strings
    if (!Array.isArray(assignedEmployees)) {
      return next(new ErrorHandler("Invalid format for assignedEmployees", 400));
    }

    // Fetch the project to check ownership
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return next(new ErrorHandler("Project not found", 404));
    }

    // Check if the user creating the task is the creator of the project
    if (projectDoc.createdBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized to create task for this project", 403));
    }

    // Create and save the task
    const task = new Task({ title, description, assignedEmployees, project, dueDate });
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    next(error);
  }
};





export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (req.user.role === 'project_manager') {
      // Project Manager sees all tasks related to their projects
      const projectIds = await Project.find({ createdBy: userId }).select('_id');
      const tasks = await Task.find({ project: { $in: projectIds } })
      .populate({
        path: 'assignedEmployees',
        select: 'username'  // Select only the 'name' field
      }) 
        // Ensure this matches the schema field name
        .populate({
          path:"project",
          select:"title"
        });
      return res.status(200).json({
        success: true,
        tasks
      });
    } else if (req.user.role === 'employee') {
      // Employee sees only the tasks assigned to them
      const tasks = await Task.find({ assignedEmployees: userId })  // Ensure this matches the schema field name
      .populate({
        path:"project",
        select:"title"
      });
      return res.status(200).json({
        success: true,
        tasks
      });
    } else {
      return next(new ErrorHandler("Unauthorized role", 403));
    }
  } catch (error) {
    next(error);
  }
};




export const getTaskByProjectId = async (req, res, next) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate({
        path: 'assignedEmployees',
        select: 'username'  // Select only the 'name' field
      })  // Ensure this matches the schema field name
    res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskByEmployee = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    if (!task.assignedEmployees.includes(req.user._id)) {
      return next(new ErrorHandler("Unauthorized Access", 403));
    }

    // Check if the user is in the assignedEmployees list
    if (!task.assignedEmployees.equals(req.user._id)) {
      return next(new ErrorHandler("Unauthorized Access", 403));
    }

    // Toggle the task status between 'pending' and 'completed'
    task.status = task.status === 'completed' ? 'pending' : 'completed';

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task
    });
  } catch (error) {
    next(error);
  }
};
