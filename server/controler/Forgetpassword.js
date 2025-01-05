import UserModel from "../model/usermodel.js";
import crypto from "crypto"
import {sendResetPasswordEmail} from "../nodemail/index.js"

export const forgetpassword = async (req,res)=>{
      const {email} = req.body;
    if(!email){
        return res.status(400).json({ message:"enter email"})

    }

    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
   
    const resettoken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();

   const resetURL = `http://localhost:5173/reset/${resettoken}`;
   sendResetPasswordEmail(email, resetURL)

    res.status(200).json({
        message:"link sent to your email",
        resettoken

    })
    

}