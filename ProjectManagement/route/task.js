import express from "express";
import { createTask, getAllTasks, getTaskByProjectId, updateTaskByEmployee } from "../controller/task.js"
import { isAuthentication } from "../middleware/auth.js";
const router = express.Router();

// Create a task (only project manager)
router.post('/newTask',isAuthentication,createTask );

// Get all tasks
router.get('/',isAuthentication,getAllTasks);

// Get tasks by project
router.get('/project/:projectId',isAuthentication,getTaskByProjectId );

// Update task status (only by employee)
router.patch('/status/:id',isAuthentication,updateTaskByEmployee);

export default router