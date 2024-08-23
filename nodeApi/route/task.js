import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controller/task.js";
import { isAuthentication } from "../middleware/auth.js";

const router=express.Router();

router.post("/newTask",isAuthentication,newTask)


router.get("/my",isAuthentication,getMyTask)

router.route("/:id").put(isAuthentication,updateTask).delete(isAuthentication,deleteTask)
export default router;