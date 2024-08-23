
import { User } from "../model/user.js";
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/feature.js";
import ErrorHandler from '../middleware/error.js';



export const register=async(req,res,next)=>{
   try {
    const {username,email,password} =req.body;
    
    let existingUser = await User.findOne({ username });

    if (existingUser)return next(new ErrorHandler("User Already Exist",404));

    // If username doesn't exist, create a new user
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email,password:hashedPassword});
   
    sendCookies(newUser,res,"Register Seccessfully",201)
   } catch (error) {
    next(error)
   }
};

export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

    const user=await User.findOne({email}).select("+password");


    if(!user)return next(new ErrorHandler("Invalid Email and password",404));
        


    const isMatch =await  bcrypt.compare(password, user.password)
    if(!isMatch)return next(new ErrorHandler("Invalid Email and password",404));
        

    sendCookies(user,res,`Welcome Back, ${user.username}`,200);
        
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
   try {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
   } catch (error) {
    next(error)
   }
};


export const getMyProfile=(req,res)=>{
try {
    
    res.status(200).json({
        success:true,
        user:req.user
    })
} catch (error) {
    next(error)
}
}


export const getAllUser=async(req,res)=>{
    const users =await User.find({});
    res.json({
        success:true,
        users:users
    })
};

export const getUserbyId=async(req,res)=>{
   try {
    const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        users:user
    })

   } catch (error) {
    next(error)
   }
};
