import UserModel from "../model/usermodel.js";
import bcrypt from "bcrypt"
import {sendResetPasswordSuccessEmail} from "../nodemail/index.js"


export const resetPassword = async (req,res) =>{
    const {token} = req.body;
    const {password} = req.body;
    
    if (!token) {
        return res.status(400).json({ message: "Token is required." });
    }

    if(!password){
        res.status(400).json({message :"enter password"})
    }
    const user = await UserModel.findOne({
        resetPasswordToken:token
    })

    if(!user){
        res.status(400).json({message:"token invalid or expired"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    user.password = hashedPassword;

    await user.save()
    sendResetPasswordSuccessEmail(user.email);

    res.status(200).json({ success:true,  message: "Password reset successful" });

}