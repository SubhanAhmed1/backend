
import { User } from "../model/user.js";
import bcrypt from "bcrypt"


export const getNewUser=async(req,res)=>{
    const {username,password} =req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password:hashedPassword});
   
   res.json({
       success:true,
       message:"register sucessfully"
   })
   };


export const getAllUser=async(req,res)=>{
    const users =await User.find({});
    res.json({
        success:true,
        users:users
    })
};

export const getUserbyId=async(req,res)=>{
    const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        users:user
    })

}