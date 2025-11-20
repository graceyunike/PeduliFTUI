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
