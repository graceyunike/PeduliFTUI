import mongoose from 'mongoose';
import crypto from 'crypto';

const timelinePostSchema = new mongoose.Schema({
    post_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    }
    }, {
    timestamps: true
});

const TimelinePost = mongoose.model('TimelinePost', timelinePostSchema);
export default TimelinePost;
