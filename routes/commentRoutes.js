const express=require("express")
const router=express.Router()

const {getComment,postComment} =require("../Controllers/CommentControllers.js")
const { protect } = require("../middleWares/authMiddleWare.js")
const { roleAllow } = require("../middleWares/roleMiddleWare.js")

router.post("/postComment",protect,roleAllow("author"||"admin"),postComment)
router.get("/getComment",getComment)




module.exports=router