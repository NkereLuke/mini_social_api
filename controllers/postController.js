const Post = require('../models/post');

// Create
exports.createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.path : null,
    user: req.user.id
  });

  res.json(post);
};

// Get all
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user');
  res.json(posts);
};

// Get one
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

// Update
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  await post.save();
  res.json(post);
};

// Delete
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await post.deleteOne();
  res.json({ message: "Deleted" });
};