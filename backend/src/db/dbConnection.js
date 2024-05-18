import mongoose from "mongoose"


async function dbConnection (){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`database connected successfull at ${process.env.MONGODB_URL}`);
    } catch (error) {
        console.log("dbconnection error " , error);
    }
}

export default dbConnection