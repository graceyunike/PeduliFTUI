import TimelinePost from '../models/timelinePostsModels.js';

const getPosts = async (req, res) => {
    try {
        const posts = await TimelinePost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await TimelinePost.findOne({ post_id: id });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const post = await TimelinePost.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await TimelinePost.findOneAndDelete({ post_id: id });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getPosts, getPostById, createPost, deletePost };
