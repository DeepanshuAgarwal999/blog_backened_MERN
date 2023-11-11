import { User } from "../Models/userSchema.js";
import bcrypt from "bcrypt";

import { generateCookie } from "../utils/feature.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      massage: "User Already Exist",
      success: false,
    });
  } else {
    if (email && password && name) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });
      if (user) {
        return generateCookie(user, res, "successfully registered", 201);
      } else {
        return res.status(401).json({
          massage: "User error",
          success: false,
        });
      }
    } else {
      return res.status(403).json({
        massage: "please fill fields",
        success: false,
      });
    }
  }
};
export const userLogin = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      massage: "User not exist",
      success: false,
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return generateCookie(user, res, "successfully login", 200);
    } else {
      return res.status(400).json({
        massage: "Credentials are invalid",
        success: false,
      });
    }
  }
};

export const getMyprofile = async (req, res) => {
  res.status(200).json({
    message: "hey!",
    user: req.user,
  });
};
