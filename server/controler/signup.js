import UserModel from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendResetPasswordEmail,sendVerificationEmail,sendResetPasswordSuccessEmail} from "../nodemail/index.js"
import { verification } from "./verification.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Enter all the fields" });
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationPasswordToken = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    verificationPasswordToken,
  });

  const token = jwt.sign({ id:user._id }, process.env.JWTSECRET);
  
  sendVerificationEmail(email,verificationPasswordToken);
   
  res.status(200).json({
    message: "User created successfully",
    token:token, 
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      verificationPasswordToken: user.verificationPasswordToken,
    },
  });
};
