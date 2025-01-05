import express from "express";
const router = express.Router();

import { login } from "../controler/login.js";
import { signup } from "../controler/signup.js";
import { verification } from "../controler/verification.js";
import { forgetpassword } from "../controler/Forgetpassword.js";
import { resetPassword } from "../controler/resetpassword.js";


router.post("/login", login);
router.post("/signup", signup);
router.post("/verify",verification)
router.post("/forget",forgetpassword)
router.post("/reset/token",resetPassword)

export default router;
