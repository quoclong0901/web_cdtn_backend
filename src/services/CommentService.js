const Comment = require('../models/commentModel');

exports.createComment = (data) => Comment.create(data);
exports.getCommentsByProduct = (id) =>
  Comment.find({ id }).populate('userId', 'name');
exports.getAllComments = () => Comment.find().populate('userId').populate('productId');
exports.deleteComment = (id) => Comment.findByIdAndDelete(id);
