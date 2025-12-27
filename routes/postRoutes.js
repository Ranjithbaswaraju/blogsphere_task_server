const express = require("express");
const {
  getPost,
  postPost,
  deletePost,
  getSinglePost,
  updatePost,
} = require("../Controllers/postControllers");

const { protect } = require("../middleWares/authMiddleWare");
const { roleAllow } = require("../middleWares/roleMiddleWare");
const { blogController } = require("../Controllers/blogController");

const router = express.Router();

// GET ALL POSTS
router.get("/getPost", getPost);

// CREATE POST (author only)
router.post(
  "/postPost",
  protect,
  roleAllow("author"),
  postPost
);

// GET SINGLE POST
router.get("/getPost/:postId", getSinglePost);

// DELETE POST (author only) ✅
router.delete(
  "/deletePost/:postId",
  protect,
  roleAllow("author"),
  deletePost
);

// UPDATE POST
router.put(
  "/updatePost/:postId",
  protect,
  roleAllow("author"),
  updatePost
);

// ADMIN TOGGLE
router.patch(
  "/getPost/:postId/toggle",
  protect,
  roleAllow("admin"),
  blogController
);

module.exports = router;
