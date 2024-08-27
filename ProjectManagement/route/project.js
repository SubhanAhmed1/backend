import express from "express";
import { getProjects,createProject,getProjectById , updateProject, deleteProject, getAssignedEmployeesByProject} from "../controller/project.js";
import { isAuthentication } from "../middleware/auth.js";
const router = express.Router();

// Create a project (only for project manager)
router.post('/',isAuthentication,createProject);

// Get all projects
router.get('/',isAuthentication, getProjects);

// Get a single project by ID
router.get('/employee/:id',isAuthentication,getAssignedEmployeesByProject);
router.get('/:id',isAuthentication,getProjectById);

// Update a project
router.put('/:id',isAuthentication, updateProject);

// Delete a project
router.delete('/:id',isAuthentication,deleteProject );

export default router
