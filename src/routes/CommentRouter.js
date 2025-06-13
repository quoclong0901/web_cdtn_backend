const express = require('express');
const router = express.Router();
const { authMiddleWare,verifyToken } = require('../middleware/authMiddleWare');
const CommentController = require('../controllers/CommentController');

// Tao comment cho san pham
router.post('/create', verifyToken,CommentController.createComment);
// Lay danh sach comment theo productId
router.get('/product/:productId', CommentController.getCommentsByProduct);

// Xoa comment
router.delete('/:commentId',verifyToken, CommentController.deleteComment);

// Cap nhat comment
router.put('/:commentId',verifyToken, CommentController.updateComment);

// Admin
// Lay danh sach comment
router.get('/all', authMiddleWare,CommentController.getAllComments);

// Xoa comment 
router.delete('/admin/:commentId', authMiddleWare, CommentController.adminDeleteComment);
module.exports = router;
