import { createComment as _createComment, getCommentsByProduct as _getCommentsByProduct, getAllComments as _getAllComments, deleteComment as _deleteComment, updateComment as _updateComment } from '../services/CommentService';
const CommentController = {
    async createComment(req, res) {
        try {
            console.log(req);
            const commentData = {
                product: req.body.productId,
                user: req.user.id, // cần auth middewware để lấy userId từ token
                rating: req.body.rating,
                commentText: req.body.commentText
            };
            if (!commentData.product || !commentData.rating || !commentData.commentText) {
                return res.status(400).json({ message: 'Product ID, rating, and comment text are required' });
            }
            if (commentData.rating < 1 || commentData.rating > 5) {
                return res.status(400).json({ message: 'Rating must be between 1 and 5' });
            }
            const comment = await _createComment(commentData);
            res.status(201).json({
                message: 'Comment created successfully',
                rating: comment.rating,
                commentText: comment.commentText,   
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCommentsByProduct(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const comments = await _getCommentsByProduct(req.params.productId, page, limit);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllComments(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const comments = await _getAllComments(page, limit);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    

    async deleteComment(req, res) {
        try {
            const userId = req.user.id; 
            const deletedComment = await _deleteComment(req.params.commentId, userId);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateComment(req, res) {
        try {
            const commentId = req.params.commentId;
            const userId = req.user.id; 
            if (!commentId) {
                return res.status(400).json({ message: 'Comment ID is required' });
            }
            const updateData = {
                rating: req.body.rating,
                commentText: req.body.commentText
            };
            const updatedComment = await _updateComment(commentId, userId, updateData);
            res.status(200).json({
                message: 'Comment updated successfully',
                rating: updatedComment.rating,
                commentText: updatedComment.commentText
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
export default CommentController;