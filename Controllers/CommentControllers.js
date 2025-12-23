const commentModel = require("../models/CommentPost")

const postComment=async(req,res)=>{
    try{
        const{postId,userId,text}=req.body


        if(!postId || !text){
            return res.status(400).json({
                message:"Please enter the required PostId and UserId"
            })
        }

        const data=new commentModel({
            postId,
            userId:req.user.id,
            text
        })

        const finalData=await data.save()
        res.status(200).json({
            message:"Comment Added Successfully",
            data:finalData
        })
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}


const getComment=async(req,res)=>{
   try{
    const data=await commentModel.find()
    return res.status(200).json({
        message:"Total comments and postid's and userid's",
        data:data
    })
   }
   catch(err){
    res.status(400).json(err)
   }
   
}

module.exports={postComment,getComment}