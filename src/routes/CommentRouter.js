const express = require('express');
const router = express.Router();
const { authUserMiddleWare, authMiddleWare } = require('../middleware/authMiddleWare');
const commentController = require('../controllers/CommentController');


router.post('/create', commentController.createComment);
router.get('/product/:id', commentController.getCommentsByProduct);

// Admin
router.get('/get-all-comment', authMiddleWare, commentController.getAllComments);
router.delete('/cancel-comment/:id', commentController.deleteComment);

module.exports = router;
