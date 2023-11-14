import { User } from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import { generateCookie } from "../utils/feature.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      success: false,
      massage: "User Already Exist",
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
         generateCookie(user, res, "successfully registered", 201);
      } else {
        return res.status(401).json({
          success: false,
          massage: "User error",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        massage: "please fill fields",
      });
    }
  }
};
export const userLogin = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      massage: "User not exist",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
     // generateCookie(user, res, "successfully login", 200);
       const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      user = user.toObject();
      user.password = null;
      user.token = token;
      res.status(200).cookie("token", token, {
          httpOnly: true,
          maxAge: 2 * 60 * 60 * 1000, // 2hr
          sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
          security: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
          success: true,
          message: `success login`,
          user,
        });
    } else {
      return res.status(400).json({
        success: false,
        massage: "Invalid Credentials",
      });
    }
  }
};
export const userLogout = async (req, res) => {
  if (isAuthenticated) {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logout successfully ",
      });
  } else {
    res.status(404).json({
      success: "false",
      message: "login before logout",
    });
  }
};

export const getMyprofile = async (req, res) => {
  res.status(200).json({
    message: "userProfile",
    user: req.user,
  });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(401).json({
      success: false,
      massage: "User id is not valid",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "get user",
      user,
    });
  }
};
