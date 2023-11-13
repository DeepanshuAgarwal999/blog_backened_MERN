import express from "express";
import {
  userLogin,
  userRegister,
  getUserById,
  userLogout,
} from "../Controllers/user.js";

const authRouter = express.Router();
authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.get("/logout", userLogout);
authRouter.get("/userid/:id", getUserById);
export default authRouter;
