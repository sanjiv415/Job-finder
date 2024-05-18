import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import fileUpload from "express-fileupload";
import userRouter from "../src/router/userRoutes.js"
import jobRouter from "../src/router/jobRoutes.js"
import applicationRouter from "../src/router/applicationRoutes.js"
import dotenv from "dotenv"

dotenv.config()


const app = express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())





app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret:process.env.API_SECRET 
});
console.log("process.env.CLOUD_NAME",process.env.CLOUD_NAME);
// all routes

app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)



export default app
