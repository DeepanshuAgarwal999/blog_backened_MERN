import { Blog } from "../Models/blogSchema.js";

export const createBlog = async (req, res) => {
  const { title, description, imgUrl } = req.body;
  const blog = await Blog.create({
    title,
    description,
    imgUrl,
    user: req.user,
  });
  if (blog && title && description) {
    res.status(201).json({
      success: true,
      message: "Blog add successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Blog not added",
    });
  }
};
export const viewBlog = async (req, res) => {
  const userId = req.user._id;
  const userBlogs = await Blog.find({ user: userId });
  if (!userBlogs) {
    return res.status(401).json({
      success: false,
      message: "Unable to find user blogs",
    });
  } else {
    return res.status(200).json({
      success: true,
      userBlogs,
    });
  }
};
export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const { title, description, imgUrl } = req.body;
  if (!blog)
    return res.status(404).json({
      success: false,
      message: "Blog not updated and ID is not valid ",
    });
  else {
    blog.title = title;
    blog.description = description;
    blog.imgUrl = imgUrl;
    if (blog.title && blog.description) {
      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Blog not updated successfully",
      });
    }
  }
};
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if(!blog){
    res.status(404).json({
      success:false,
      message:"unable to Delete"
    })
  }
 else{
  await blog.deleteOne();
  res.json({
    success:true,
    message:"Blog succesfully deleted"
  })
 }
};
