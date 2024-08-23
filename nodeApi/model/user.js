import mongoose from "mongoose";
// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    email:{
        type:String,
        unique:true
    },
    password: {
        type:String,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

// Create User model

export const User = mongoose.model("Users", userSchema);
