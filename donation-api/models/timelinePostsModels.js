import mongoose from 'mongoose';
import crypto from 'crypto';

const timelinePostSchema = new mongoose.Schema({
    post_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    // Associate with a campaign
    campaign_id: {
        type: String,
        required: false
    },
    // Optional reference to a user id (kept for compatibility)
    user_id: {
        type: String,
        required: false
    },
    // Human-readable creator name (e.g. organization name)
    created_by: {
        type: String,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    // Support both media_url and image_url for compatibility with frontend
    media_url: {
        type: String,
        maxlength: 1000
    },
    image_url: {
        type: String,
        maxlength: 1000
    },
    likes_count: {
        type: Number,
        default: 0
    },
    comments_count: {
        type: Number,
        default: 0
    }
    }, {
    timestamps: true
});

const TimelinePost = mongoose.model('TimelinePost', timelinePostSchema);
export default TimelinePost;
