import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { getAllUser, getNewUser, getUserbyId } from "../controller/user.js";

const router=express.Router();


router.post("/new",getNewUser);


router.get("/",(req,res)=>{
    res.send("Nice working");
});

router.get("/all",getAllUser);

router.get("/:id",getUserbyId);



export default router