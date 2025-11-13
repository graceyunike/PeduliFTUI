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
    content: {
        type: String,
        required: true
    }
    }, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
