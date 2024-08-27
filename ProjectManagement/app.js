import express from "express";
import {config} from "dotenv";
import projectRouter from './route/project.js'
import userRouter from "./route/user.js"
import cookieParser from "cookie-parser";
import taskRouter from "./route/task.js"
import { errorMiddleWare } from "./middleware/error.js";


config({
    path:"./data/config.env"
});

// create server
export const app=express();


app.use(express.json());
app.use(cookieParser());

// import routes of the apps
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.use("/api/v1/users/project",projectRouter)

app.use(errorMiddleWare);