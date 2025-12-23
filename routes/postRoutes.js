

const express = require("express");
const {
  getPost,
  postPost,
  deletePost,
  getSinglePost,
  updatePost
} = require("../Controllers/postControllers");
const { protect } = require("../middleWares/authMiddleWare");
const { roleAllow } = require("../middleWares/roleMiddleWare.js");
const { blogController } = require("../Controllers/blogController.js");
const router = express.Router();

router.get("/getPost",getPost);

router.post("/postPost",protect,roleAllow("author"), postPost);

router.get("/getPost/:postId", getSinglePost);
router.delete("/deletePost/:postId",protect,roleAllow("author"),deletePost);
router.put("/updatePost/:postId",protect,roleAllow("author"),updatePost)
router.patch("/getPost/:postId/toggle",protect,roleAllow("admin"),blogController)



module.exports = router;
