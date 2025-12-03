// API Configuration
const API_BASE_URL = 'http://localhost:3000';

// Login API call
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login gagal');
        }

        // Debug: tampilkan data respons login
        console.log('login response data:', data);

        // Simpan token ke localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Register API call
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                //role: 'donor', // default role untuk registrasi
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Registrasi gagal');
        }

        return data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Get token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch users');
        return data;
    } catch (error) {
        console.error('Fetch users error:', error);
        throw error;
    }
};

// Fetch user by id
export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch user');
        return data;
    } catch (error) {
        console.error('Fetch user by id error:', error);
        throw error;
    }
};

// --- CAMPAIGNS ---

// Fetch donation campaigns
export const fetchCampaigns = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch campaigns');
        return data;
    } catch (error) {
        console.error('Fetch campaigns error:', error);
        throw error;
    }
};

// Fetch single campaign by id
export const fetchCampaignById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch campaign');
        return data;
    } catch (error) {
        console.error('Fetch campaign by id error:', error);
        throw error;
    }
};

// Create a new campaign
export const postCampaign = async (campaignData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create campaign');
        return data;
    } catch (error) {
        console.error('Post campaign error:', error);
        throw error;
    }
};

// --- TIMELINE POSTS ---

// Fetch timeline posts
export const fetchTimelinePosts = async (campaignId = null) => {
    try {
        const url = campaignId ? `${API_BASE_URL}/timeline-posts?campaign_id=${encodeURIComponent(campaignId)}` : `${API_BASE_URL}/timeline-posts`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch timeline posts');
        return data;
    } catch (error) {
        console.error('Fetch timeline posts error:', error);
        throw error;
    }
};

// Fetch single timeline post by id
export const fetchPostById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/timeline-posts/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch post');
        return data;
    } catch (error) {
        console.error('Fetch post by id error:', error);
        throw error;
    }
};

// Create a new timeline post
export const createTimelinePost = async (postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/timeline-posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create timeline post');
        return data;
    } catch (error) {
        console.error('Create timeline post error:', error);
        throw error;
    }
};

// Fetch comments by post_id
export const fetchCommentsByPostId = async (postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/post/${postId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch comments');
        return data;
    } catch (error) {
        console.error('Fetch comments by post id error:', error);
        throw error;
    }
};

// Create comment
export const createComment = async (postId, userId, content) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: postId,
                user_id: userId,
                content: content
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create comment');
        return data;
    } catch (error) {
        console.error('Create comment error:', error);
        throw error;
    }
};

// Delete comment
export const deleteComment = async (commentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to delete comment');
        return data;
    } catch (error) {
        console.error('Delete comment error:', error);
        throw error;
    }
};

// Get trust statistics
export const getTrustStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/trust/stats`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch trust stats');
        return data;
    } catch (error) {
        console.error('Fetch trust stats error:', error);
        throw error;
    }
};

// --- DONATIONS ---

// Create a donation
export const createDonation = async (donationData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create donation');
        return data;
    } catch (error) {
        console.error('Create donation error:', error);
        throw error;
    }
};

// Fetch donations by user ID
export const fetchDonationsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/donations/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch donations');
        return await response.json();
    } catch (error) {
        console.error('Fetch donations by user error:', error);
        throw error;
    }
};

// Update user profile
export const updateUser = async (userId, userData) => {
    try {
        const token = getToken();
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to update user');
        return data;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
};
