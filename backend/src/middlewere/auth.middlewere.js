import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.js"

export async function isAuthenticated (req,res,next){
    
    const { token } = await req.cookies 
    console.log(token);

    

    if(!token){
        return res.status(400).json({
            message:"user not authenticate "
        })
    }

    console.log(token);

    const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decode.id)

    next()


}