import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'completed'], 
      default: 'pending' 
    },
    assignedEmployees: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
  });
  
export  const Task = mongoose.model('Task', taskSchema);
    