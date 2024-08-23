import express from "express";
import {config} from "dotenv";
import UserRouter from "./route/user.js";
import TaskRouter from "./route/task.js";   
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middleware/error.js";

// config env file

config({
    path:"./data/config.env"
});

// create server
export const app=express();


app.use(express.json());
app.use(cookieParser());

// import routes of the apps
app.use("/api/v1/users",UserRouter);
app.use("/api/v1/task",TaskRouter);

app.use(errorMiddleWare);


