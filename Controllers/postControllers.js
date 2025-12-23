const { blogModel } = require("../models/blogPost");
//paginated post 
const getPost = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;
    const totalPosts = await blogModel.countDocuments();

    const posts= await blogModel.find().skip(skip).limit(limit).sort({createdAt:-1});
    res.status(200).json({
        message:"Available Posts",
        currentPage:page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        posts
    })


  } catch (err) {
    res.status(400).send(err);
  }
};

//or for getting all the posts 
// const getPost=async(req,res)=>{
//       try {
//       const data = await blogModel.find();
//       res.status(200).json({
//         message: "These are all posts in database",
//         data: data,
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
// }

const postPost = async (req, res) => {
  const { title, content, status } = req.body;

  if (!title || !content) {
    return res.status(401).json({
      message: "Please enter content or title",
    });
  }

  const data = new blogModel({
    title,
    content,
    status,
    authorId: req.user.id,
  });

  const blogData = await data.save();

  res.status(200).json({
    message: "Successfully created Blog",
    user: blogData,
  });
};

const getSinglePost = async (req, res) => {
  const id = req.params.postId;
  try {
    const data = await blogModel.findById(id, req.body);
    res.status(200).json({
      message: "Single post",
      data: data,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.postId;

    const data = await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Post Successfully Deleted",
      data: data,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.postId;
    const updateData = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Post updated Successfully",
      data: updateData,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = { getPost, postPost, getSinglePost, deletePost, updatePost };
