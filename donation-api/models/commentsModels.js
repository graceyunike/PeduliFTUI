import mongoose from 'mongoose';
import crypto from 'crypto';

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        default: 'Anonymous User'
    },
    content: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        enum: ['trusted', 'untrusted', 'pending'],
        default: 'pending'
    },
    sentiment_score: {
        type: Number,
        min: 0,
        max: 1,
        default: null
    }
    }, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
