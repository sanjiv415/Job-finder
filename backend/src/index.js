import dotenv from "dotenv";

import dbConnection from "./db/dbConnection.js";
import app from "./app.js";

dotenv.config();


dbConnection()
.then(()=>{
 app.listen(process.env.PORT,()=>{
    console.log(`port is running ${process.env.PORT}`);
 })
 app.on("ERROR",(error)=>{
    console.log(error);
 })
})
.catch((error)=>{
  console.log(error);
})