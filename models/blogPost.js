const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{type:String,required:true,minLength:3},
    content:{type:String,required:true},
    authorId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    status:{ type: String, enum: ["draft", "published"], default: "PUBLISHED" },
    likesCount: { type: Number, default: 0 }

},{timestamps:true})

const blogModel=mongoose.model("blogs",blogSchema)


module.exports={blogModel};
