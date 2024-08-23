import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const isAuthentication = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(404).json({
            success:false,
            message:"Login First"
        });  
    } 
    const decode =jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decode._id);
    next();

};
