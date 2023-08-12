const express = require('express');
const router = express.Router();

const { postContent,getPost,updatePost,deletePost,getUserPost } = require('../controllers/post');

router.route('/').post(postContent)
router.route('/:postId').get(getPost).delete(deletePost).patch(updatePost);
router.route('/user/:userId').get(getUserPost)

module.exports = router;