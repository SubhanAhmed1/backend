import { app } from "./app.js";
import { DBConnect } from "./data/database.js";

DBConnect();

app.listen(process.env.PORT,()=>{
    console.log("server is working fine")
}); 