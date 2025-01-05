import UserModel from "../model/usermodel.js";

export const verification = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Provide token (OTP)" });
  }

  const user = await UserModel.findOne({ verificationPasswordToken: token });

  if (!user) {
    return res.status(400).json({ message: "Provide a valid token (OTP)" });
  }

  user.isVerified = true;
  await user.save();

  res.status(201).json({
    message: "User verified successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
};
