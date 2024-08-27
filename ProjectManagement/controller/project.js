import { Project } from "../model/project.js";
import ErrorHandler from '../middleware/error.js';
import {Task} from "../model/tasks.js"

// Create a new project (only Project Manager)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, assignedEmployees } = req.body;

    // Ensure the user is a project manager
    if (req.user.role !== 'project_manager') {
      return next(new ErrorHandler("Unauthorized, only project managers can create projects", 403));
    }

    const project = new Project({
      title,
      description,
      createdBy: req.user._id, // Set createdBy as the logged-in project manager
      assignedEmployees
    });

    await project.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project
    });
  } catch (error) {
    next(error);
  }
};

// Get all projects (Project Manager gets all, Employee gets assigned projects)
export const getProjects = async (req, res, next) => {
  try {
    // Get the logged-in user's ID
    const userId = req.user._id;

    // Determine the role of the user
    if (req.user.role === 'project_manager') {
      // Project Manager sees all projects they created
      const projects = await Project.find({ createdBy: userId }).populate('assignedEmployees', 'username');  // Only populate 'name'
      return res.status(200).json({
        success: true,
        projects
      });
    } else if (req.user.role === 'employee') {
      // Employee sees only the projects they are assigned to
      const projects = await Project.find({ assignedEmployees: userId }).populate('assignedEmployees', 'username');  // Only populate 'name'
      return res.status(200).json({
        success: true,
        projects
      });
    } else {
      // Handle case where role is unknown or unauthorized
      return next(new ErrorHandler("Unauthorized role", 403));
    }
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('assignedEmployees');

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Ensure only the project manager who created it or the assigned employee can view it
    if (req.user.role === 'employee' && !project.assignedEmployees.includes(req.user._id)) {
      return next(new ErrorHandler("Unauthorized, you are not assigned to this project", 403));
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};
export const getAssignedEmployeesByProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    // Find the project by its ID
    const project = await Project.findById(projectId).populate('assignedEmployees', 'username'); // Only populate names of employees

    if (!project) {
      return next(new ErrorHandler("Project not found", 404));
    }

    // Extract the assigned employees
    const assignedEmployees = project.assignedEmployees;

    if (!assignedEmployees || assignedEmployees.length === 0) {
      return next(new ErrorHandler("No employees assigned to this project", 404));
    }

    res.status(200).json({
      success: true,
      assignedEmployees,
    });
  } catch (error) {
    next(error);
  }
};


// Update a project (only Project Manager)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Ensure only the project manager who created it can update it
    if (req.user.role !== 'project_manager' || project.createdBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized, only the project manager who created the project can update it", 403));
    }

    // Update project details
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedEmployees');

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      updatedProject
    });
  } catch (error) {
    next(error);
  }
};

// Delete a project (only Project Manager)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Ensure only the project manager who created it can delete it
    if (req.user.role !== 'project_manager' || project.createdBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized, only the project manager who created the project can delete it", 403));
    }

    // Delete all project related to the project
    await project.deleteMany({ projectId: project._id });

    // Now delete the project
    await project.deleteOne();
    res.status(200).json({
      success: true,
      message: "Project and related project deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
