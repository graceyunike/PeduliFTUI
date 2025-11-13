import Comment from '../models/commentsModels.js';

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findOne({ comment_id: id });
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findOneAndDelete({ comment_id: id });
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getComments, getCommentById, createComment, deleteComment };
