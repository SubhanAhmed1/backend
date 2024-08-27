import mongoose from "mongoose";

export const DBConnect=()=>{
    mongoose.connect(process.env.DataBaseUrl, {
        dbName: "taskManagement"
    })
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));
    
}
