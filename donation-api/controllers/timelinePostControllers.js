import TimelinePost from '../models/timelinePostsModels.js';
import User from '../models/userModels.js';

const getPosts = async (req, res) => {
    try {
        // Allow filtering by campaign_id: /timeline-posts?campaign_id=<id>
        const { campaign_id } = req.query;
        const filter = {};
        if (campaign_id) filter.campaign_id = campaign_id;

        // Return posts sorted by newest first
        const posts = await TimelinePost.find(filter).sort({ createdAt: -1 });

        // Fetch profile pictures for all creators
        const postsWithProfiles = await Promise.all(
            posts.map(async (post) => {
                const postData = post.toObject();
                
                // Try to fetch profile picture using user_id first
                if (post.user_id) {
                    try {
                        const user = await User.findOne({ user_id: post.user_id });
                        if (user && user.profile_picture) {
                            postData.creator_profile_picture = user.profile_picture;
                        }
                    } catch (userErr) {
                        console.warn('Failed to fetch creator profile for user_id:', post.user_id);
                    }
                }
                
                // If not found by user_id, try fetching by created_by name
                if (!postData.creator_profile_picture && post.created_by) {
                    try {
                        const user = await User.findOne({ name: post.created_by });
                        if (user && user.profile_picture) {
                            postData.creator_profile_picture = user.profile_picture;
                        }
                    } catch (userErr) {
                        console.warn('Failed to fetch creator profile for name:', post.created_by);
                    }
                }
                
                return postData;
            })
        );

        res.status(200).json(postsWithProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await TimelinePost.findOne({ post_id: id });
        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Fetch creator's profile picture from User model
        let creatorProfilePicture = null;
        
        // Try to fetch by user_id first
        if (post.user_id) {
            try {
                const user = await User.findOne({ user_id: post.user_id });
                if (user && user.profile_picture) {
                    creatorProfilePicture = user.profile_picture;
                }
            } catch (userErr) {
                console.warn('Failed to fetch creator profile by user_id:', post.user_id);
            }
        }
        
        // If not found by user_id, try fetching by created_by name
        if (!creatorProfilePicture && post.created_by) {
            try {
                const user = await User.findOne({ name: post.created_by });
                if (user && user.profile_picture) {
                    creatorProfilePicture = user.profile_picture;
                }
            } catch (userErr) {
                console.warn('Failed to fetch creator profile by name:', post.created_by);
            }
        }

        // Add profile picture to response if found
        const postData = post.toObject();
        if (creatorProfilePicture) {
            postData.creator_profile_picture = creatorProfilePicture;
        }

        res.status(200).json(postData);
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

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = {};
        const allowed = ['content', 'media_url', 'image_url', 'likes_count', 'comments_count', 'created_by', 'campaign_id', 'user_id'];
        for (const key of allowed) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                updateFields[key] = req.body[key];
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No valid fields provided for update' });
        }

        const post = await TimelinePost.findOneAndUpdate({ post_id: id }, updateFields, { new: true });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        console.error('Update post error', error);
        res.status(500).json({ error: error.message });
    }
};

export { getPosts, getPostById, createPost, deletePost, updatePost };
