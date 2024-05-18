export async function sendToken(user,status,res,message){
  const token = await user.getJwtToken()
  if(!token){
   return res.status(400).json({
        messaage:"fail to generator token"
    })
  }

   const options = {
    expiresIn: process.env.COOKIE_EXPIRE,
    httpOnly: true, // Set httpOnly to true
  };

  

  return res.status(status).cookie("token",token,options).json({
    success:true,
    user,
    status,
    message,
  
  })
  
}