import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();

const connectDB = async () => {
    try{
         await mongoose.connect(process.env.MONGODB_URL)
         console.log("connection eastablished successfully")
    }
    catch(err){
             console.error("connection didn't eastablished ",err)
    }
    
}

export default connectDB;