import express from "express";
import { userLogin, userRegister } from "../Controllers/user.js";


const authRouter = express.Router();
authRouter.post("/register",userRegister)
authRouter.get("/login",userLogin )
authRouter.get("/logout", (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logout successfully ",
    });
});
export default authRouter;
