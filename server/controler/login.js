import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import UserModel from "../model/usermodel.js";

export const login = async (req,res) =>{
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({message :"fill all the filds"})
  }
  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(400).json({message:"user does not exist"})
  }
  const isCorrect = await bcrypt.compare(password,user.password)
  if(!isCorrect){
    res.status(400).json({message:"enter valid password"})
  }
  const token = jwt.sign({id:user._id},process.env.JWTSECRET)

   await user.save();

   res.status(200).json({
    message: "User logedin successfully",
    token:token, 
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });


  


}