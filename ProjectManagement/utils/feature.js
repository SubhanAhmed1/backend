import jwt from "jsonwebtoken";

export const sendCookies=(newUser,res,message,statusCode=200)=>{
    const token = jwt.sign({ _id: newUser._id },process.env.JWT_SECRET);

res.status(statusCode).cookie("token",token,{
 httpOnly:true,
}).json({

     success:true,
     message
})
}