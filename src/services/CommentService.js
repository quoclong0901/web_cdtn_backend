const Comment = require('../models/commentModel');
const mongoose = require('mongoose'); 
const CommentService = {
    async createComment(commentData) {
        try {
            const comment = new Comment(commentData);
            return await comment.save();
        } catch (error) {
            throw new Error('Error creating comment: ' + error.message);
        }
    },

    async getCommentsByProduct(productId, page=1, limit=0) {
      try {
          if (!mongoose.Types.ObjectId.isValid(productId)) {
              throw new Error('Invalid product ID');
          }
          const skip = (page - 1) * limit; 
          const comments= await Comment.find({ product: productId })
                                .populate('user', 'avatar name')
                                .sort({ createdAt: -1 })
                                .skip(skip)
                                .limit(limit)
                          
          const totalComments = await Comment.countDocuments({product: productId });
          const totalPages = Math.ceil(totalComments / limit);
          return {
              totalComments,
              totalPages,
              currentPage: page,
              comments
          };
        } catch (error) {
            throw new Error('Error fetching comments: ' + error.message);
        }
    },

    async getAllComments(page=1, limit=10) {
      try {
            const skip = (page - 1) * limit;
            const comments = await Comment.find()
                .populate('user', 'avatar name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            const totalComments = await Comment.countDocuments();
            const totalPages = Math.ceil(totalComments / limit);
            return {
                totalComments,
                totalPages,
                currentPage: page,
                comments
            };
        } catch (error) {
            throw new Error('Error fetching all comments: ' + error.message);
        }
    },

    async deleteComment(commentId, userId) {
        try {
            const comment = await Comment.findOne({ _id: commentId, user: userId });
            if (!comment) {
                throw new Error('Comment not found or you do not have permission to delete it');
            }
            return await Comment.findByIdAndDelete(commentId);
        } catch (error) {
            throw new Error('Error deleting comment: ' + error.message);
        }
    },

    async updateComment(commentId, userId, updateData) {
        try {
            const comment = await Comment.findOne({ _id: commentId, user: userId });
            if (!comment) {
                throw new Error('Comment not found or you do not have permission to update it');
            }
            comment.rating = updateData.rating || comment.rating;
            comment.commentText = updateData.commentText || comment.commentText;
            return await comment.save();
        } catch (error) { 
            throw new Error('Error updating comment: ' + error.message);
        }
    }


};
module.exports = CommentService;