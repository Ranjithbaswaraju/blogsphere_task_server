const { blogModel } = require("../models/blogPost");

// GET POSTS (PAGINATED)
const getPost = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const totalPosts = await blogModel.countDocuments();

    const posts = await blogModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Available Posts",
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE POST ✅ FIXED RESPONSE
const postPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const blogData = await blogModel.create({
      title,
      content,
      status,
      authorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Successfully created Blog",
      post: blogData, // ✅ FRONTEND NEEDS THIS
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET SINGLE POST
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await blogModel.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post: data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE POST ✅ PARAM FIX
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await blogModel.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post Successfully Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateData) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated Successfully",
      post: updateData,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getPost,
  postPost,
  getSinglePost,
  deletePost,
  updatePost,
};
