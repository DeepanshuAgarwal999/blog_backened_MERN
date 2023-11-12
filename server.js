import express from "express";
import DBconn from "./DBconn.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blog.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
const app = express();
DBconn();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//userRouter
app.use("/", userRouter);
app.use("/auth/users", authRouter);

//blog router
app.use("/users/blogs", blogRouter);

config({
  path: "./constant/config.env",
});
app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port -> ${process.env.PORT}`);
});
