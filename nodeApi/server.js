import { app } from "./app.js";
import { DBConnect } from "./data/batabase.js";

DBConnect();

app.listen(process.env.PORT,()=>{
    console.log("server is working fine")
}); 