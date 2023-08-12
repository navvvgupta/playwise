const Posts = require('../Models/post');
const errorHandler=require('../errors/errorHandler')

const postContent=async(req,res)=>{
    const post = await Posts.create(req.body);
    res.status(200).json({ post });
}
const getPost=async(req,res,next)=>{

  const post = await Posts.findOne({_id:req.params.postId});

  if (!post) {
    return next(new errorHandler("Post Does not exist",404))
  }

  res.status(200).json({ post });
}
const updatePost=async(req,res)=>{
    const post = await Posts.findOneAndUpdate({ _id: req.params.postId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!post) {
      return next(new errorHandler("Post Does not exist",404))
    }
  
    res.status(200).json({post});
}
const deletePost=async(req,res)=>{
    const post = await Posts.findOneAndDelete({ _id: req.params.postId});
  
    if (!post) {
      return next(new errorHandler("Post Does not exist",404))
    }
  
    res.status(200).json({ msg: 'Success! Post removed.' });
}
const getUserPost=async(req,res)=>{
    const post = await Posts.find({userId:req.params.userId});

    if (!post) {
      return next(new errorHandler("Post Does not exist of that specific user",404))
    }

  res.status(200).json({ post });
}
module.exports={postContent,getPost,updatePost,deletePost,getUserPost}