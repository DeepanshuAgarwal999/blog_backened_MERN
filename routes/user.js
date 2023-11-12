import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyprofile } from "../Controllers/user.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    success: true,
    massage: "home",
  });
});
router.get("/myprofile", isAuthenticated,getMyprofile);
export default router;
