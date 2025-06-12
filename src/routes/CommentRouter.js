const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleWare');
const CommentController = require('../controllers/CommentController');

// Tao comment cho san pham
router.post('/create', verifyToken,CommentController.createComment);
// Lay danh sach comment theo productId
router.get('/product/:productId', CommentController.getCommentsByProduct);
// Lay danh sach comment
router.get('/', CommentController.getAllComments);
// Xoa comment
router.delete('/:commentId',verifyToken, CommentController.deleteComment);

// Cap nhat comment
router.put('/:commentId',verifyToken, CommentController.updateComment);

module.exports = router;
