import jwt from "jsonwebtoken";

export const generateCookie = (user, res, message, statuscode) => {
  if (statuscode === 201 || statuscode === 200) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(statuscode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2hr
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        security: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        massage: `${message + " " + user.name}`,
      });
  }
};
