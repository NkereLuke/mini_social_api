const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router();

router.post('/', auth, upload.single('image'), createPost);
router.get('/', auth, getPosts);
router.get('/:id', auth, getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;