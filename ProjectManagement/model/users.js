import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true,select:false },
  role: { 
    type: String, 
    enum: ['project_manager', 'employee'], 
    required: true 
  },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);


