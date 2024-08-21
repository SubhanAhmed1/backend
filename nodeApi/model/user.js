import mongoose from "mongoose";
// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create User model

export const User = mongoose.model("Users", userSchema);
