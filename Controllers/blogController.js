const { blogModel } = require("../models/blogPost")

const blogController=async(req,res)=>{
    try{
        const {postId}=req.params
        const blog=await blogModel.find(postId)
        if(!blog){
            res.status(400).json({message:"Post not available"})
        }
        blog.status=blog.status==="published"?"draft":"published"
        const data=await blog.save();

    res.status(200).json({
      message: `Blog is now ${blog.status}`,
      data,
    });
    }
    catch(err){
        res.status(400).send(err)
    }
}
module.exports={blogController}