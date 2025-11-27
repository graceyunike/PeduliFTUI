import Comment from '../models/commentsModels.js';
import User from '../models/userModels.js';
import { analyzeSentiment, calculateTrustPercentage } from '../services/sentimentService.js';

const getComments = async (req, res) => {
    try {
        const { post_id } = req.query;
        const filter = {};
        if (post_id) filter.post_id = post_id;
        
        const comments = await Comment.find(filter).sort({ createdAt: -1 });
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

const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post_id: postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const { post_id, user_id, content } = req.body;

        // Validate input
        if (!post_id || !user_id || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Fetch user name from database
        let user_name = 'Anonymous User';
        try {
            const user = await User.findOne({ user_id });
            if (user) {
                user_name = user.name;
            }
        } catch (err) {
            console.warn('Could not fetch user name, using default:', err.message);
        }

        // Analyze sentiment using OpenRouter API
        let sentiment = 'pending';
        let sentiment_score = null;
        let sentimentError = null;

        try {
            console.log('Starting sentiment analysis for comment:', content.substring(0, 50));
            const sentimentResult = await analyzeSentiment(content);
            sentiment = sentimentResult.sentiment;
            sentiment_score = sentimentResult.score;
            console.log(`✅ Sentiment analyzed: ${sentiment} (score: ${sentiment_score})`);
        } catch (err) {
            console.error('❌ Sentiment analysis failed:', err.message);
            console.error('Full error:', err);
            sentimentError = err.message;
        }

        const comment = await Comment.create({
            post_id,
            user_id,
            user_name,
            content,
            sentiment,
            sentiment_score
        });

        res.status(201).json({
            ...comment.toObject(),
            sentimentError: sentimentError || undefined
        });
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

const getTrustStats = async (req, res) => {
    try {
        // Get all comments (including pending ones for total count)
        const allComments = await Comment.find({});

        // Calculate trust stats from all comments
        // (calculateTrustPercentage will filter for trusted/untrusted only)
        const stats = await calculateTrustPercentage(allComments);

        res.status(200).json({
            ...stats,
            lastUpdated: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getComments, getCommentById, getCommentsByPostId, createComment, deleteComment, getTrustStats };
