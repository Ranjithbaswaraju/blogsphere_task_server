const express=require('express')
const { likePost } = require('../Controllers/likeControllers')
const { protect } = require('../middleWares/authMiddleWare')
const router=express.Router()


router.post("/like",protect,likePost)




module.exports=router