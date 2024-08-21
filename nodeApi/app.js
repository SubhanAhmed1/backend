import express from "express";
import {config} from "dotenv"

import router from "./route/user.js";



config({
    path:"./data/config.env"
});

export const app=express();


app.use(express.json());
app.use("/users",router);

