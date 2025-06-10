const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user._id }; // đảm bảo user đã đăng nhập
    const comment = await commentService.createComment(data);
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

exports.getCommentsByProduct = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByProduct(req.params.productId);
    return res.json(comments);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    return res.json(comments);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.id);
    return res.json({ message: 'Xóa bình luận thành công' });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};
