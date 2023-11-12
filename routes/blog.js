import { isAuthenticated } from "../middlewares/auth.js";
import express from "express";
import {
  createBlog,
  viewBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogByID,
} from "../Controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/addnew", isAuthenticated, createBlog);
blogRouter.get("/viewblog", isAuthenticated, viewBlog);
blogRouter.put("/:id/updateblog", isAuthenticated, updateBlog);
blogRouter.delete("/:id/deleteblog", isAuthenticated, deleteBlog);
blogRouter.get("/allblogs", getAllBlogs);
blogRouter.get("/blog/:id",isAuthenticated, getBlogByID);

export default blogRouter;
