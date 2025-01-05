import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email :{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
     
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken : String,
    verificationPasswordToken : String,

})

const UserModel = mongoose.model('User',userSchema)

export default UserModel;