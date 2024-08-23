import mongoose from "mongoose";
// Define User schema
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isCreated:{
        type:Date,
        default:Date.now
    }
 
});

// Create User model

export const Task = mongoose.model("Tasks", taskSchema);
