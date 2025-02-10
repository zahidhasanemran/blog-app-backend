const { SERVER_ERROR, POST_NOT_FOUND } = require("../config/constants")
const Post = require("../models/Post");

async function createPost(req, res) {
  const {title, content } = req.body;

  try {
    const post = new Post({ title, content });
    await post.save();
  } catch (error) {
    console.error(error, "Emran");
    res.status(500).json({message: SERVER_ERROR})
  }
}

async function updatePost(req, res) {
  const {id} = req.params;
  const {title, content} = req.body;

  try {
    const postToUpdate = await Post.findByIdAndUpdate(id, {
      title,
      content,
    }) 

    if(!postToUpdate){
      return res.status(404).json({message: POST_NOT_FOUND})
    }

    res.status(200).json({ success: true, data: postToUpdate });
  } catch (error) {
    res.status(500).json({message: SERVER_ERROR})
  }

}

async function singlePost (req, res){
  const {id} = req.params;
  
  
  try {
    const post = await Post.findById(id);
    console.log(post);

    if(!post){
      return res.status(404).json({message: POST_NOT_FOUND})
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({message: SERVER_ERROR})
  }
}

async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;  // Default values added

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();

    return res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        total: totalPosts,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalPosts / limit),
      }
    });
    
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the exact error
    res.status(500).json({ message: SERVER_ERROR, error: error.message });
  }
}


module.exports = {createPost, updatePost, getPosts, singlePost}