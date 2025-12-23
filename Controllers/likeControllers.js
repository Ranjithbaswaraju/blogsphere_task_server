const { likeModel } = require("../models/likePost")


const likePost=async(req,res)=>{
    const userId=req.user.id
    const {postId}=req.body

    const existing=await likeModel.findOne({userId,postId})

    if(existing){
       await likeModel.findByIdAndDelete(existing._id)
       return res.status(200).json({
        message:"post unliked"
       })
    }

    const newLike=new likeModel({
        postId,
        userId
    })
    const data=await newLike.save()
    res.status(200).json({
        message:"liked "
    })

}

module.exports={likePost}