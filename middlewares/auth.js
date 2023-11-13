import jwt from "jsonwebtoken";
import { User } from "../Models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      massage: "login please...!",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode._id);
  if (req.user) next();
};
