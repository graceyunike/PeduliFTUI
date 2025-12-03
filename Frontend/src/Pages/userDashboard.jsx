import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';
import { getCurrentUser, fetchUserById, updateUser, fetchDonationsByUserId } from '../services/api.js';
import '../userDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profile_picture: ''
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                const currentUser = getCurrentUser();
                if (!currentUser) {
                    setError('Silakan login terlebih dahulu');
                    return;
                }

                // Fetch user details
                const userData = await fetchUserById(currentUser.user_id);
                setUser(userData);
                setFormData({
                    name: userData.name || '',
                    email: userData.email || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    profile_picture: userData.profile_picture || ''
                });

                // Fetch user donations
                try {
                    const donationsData = await fetchDonationsByUserId(currentUser.user_id);
                    setDonations(donationsData);
                } catch (donationErr) {
                    console.warn('Tidak ada riwayat donasi:', donationErr);
                    setDonations([]);
                }
            } catch (err) {
                console.error('Error loading user data:', err);
                setError('Gagal memuat data pengguna');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            // Validasi URL foto profil (jika diisi)
            if (formData.profile_picture && !isValidUrl(formData.profile_picture)) {
                setMessage({ type: 'error', text: 'URL foto profil tidak valid' });
                return;
            }

            // Validasi password jika diubah
            if (formData.newPassword) {
                if (formData.newPassword.length < 6) {
                    setMessage({ type: 'error', text: 'Password baru minimal 6 karakter' });
                    return;
                }
                if (formData.newPassword !== formData.confirmPassword) {
                    setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok' });
                    return;
                }
            }

            const updatePayload = {
                name: formData.name,
                email: formData.email,
                profile_picture: formData.profile_picture || ''
            };

            // Jika password diubah, tambahkan ke payload
            if (formData.newPassword) {
                updatePayload.password = formData.newPassword;
            }

            const updatedUser = await updateUser(user.user_id, updatePayload);
            setUser(updatedUser);
            
            // Update localStorage
            const currentStoredUser = getCurrentUser();
            if (currentStoredUser) {
                const updatedStoredUser = {
                    ...currentStoredUser,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    profile_picture: updatedUser.profile_picture
                };
                localStorage.setItem('user', JSON.stringify(updatedStoredUser));
            }

            setEditMode(false);
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
            
            // Reset password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Gagal memperbarui profil' });
        }
    };

    // Helper function untuk validasi URL
    const isValidUrl = (urlString) => {
        try {
            const url = new URL(urlString);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (err) {
            return false;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="user-dashboard-loading">
                <Navbar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Memuat data pengguna...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-dashboard-error">
                <Navbar />
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>{error}</h3>
                    <p>Silakan login untuk mengakses dashboard</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-dashboard">
            <Navbar />
            
            <div className="dashboard-container">
            

                {/* Main Content */}
                <div className="dashboard-main">
                    {/* Sidebar Navigation */}
                    <div className="dashboard-sidebar">
                        <nav className="sidebar-nav">
                            <button
                                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <span className="nav-icon">👤</span>
                                <span className="nav-text">Profil Saya</span>
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'donations' ? 'active' : ''}`}
                                onClick={() => setActiveTab('donations')}
                            >
                                <span className="nav-icon">💰</span>
                                <span className="nav-text">Riwayat Donasi</span>
                                {donations.length > 0 && (
                                    <span className="nav-badge">{donations.length}</span>
                                )}
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveTab('security')}
                            >
                                <span className="nav-icon">🔒</span>
                                <span className="nav-text">Keamanan</span>
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="dashboard-content">
                        {/* Greeting moved from green box into the white content area (left) */}
                        <div className="content-greeting">
                            <div className="greeting-left">
                                <span className="greeting">Halo,</span>
                                <h2 className="user-name-left">{user?.name || 'Pengguna'}</h2>
                            </div>
                        </div>
                        {message.text && (
                            <div className={`alert-message ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="profile-section">
                                <div className="section-header">
                                    <h2>Informasi Profil</h2>
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        {editMode ? 'Batal Edit' : 'Edit Profil'}
                                    </button>
                                </div>

                                <form onSubmit={handleProfileUpdate} className="profile-form">
                                    <div className="profile-avatar-section">
                                        <div className="avatar-container">
                                            <img 
                                                src={formData.profile_picture || 'https://via.placeholder.com/150/13A3B5/FFFFFF?text=User'} 
                                                alt="Profile" 
                                                className="profile-avatar"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150/13A3B5/FFFFFF?text=User';
                                                }}
                                            />
                                            {editMode && (
                                                <div className="avatar-url-input">
                                                    <div className="form-group">
                                                        <label>URL Foto Profil</label>
                                                        <input
                                                            type="url"
                                                            name="profile_picture"
                                                            value={formData.profile_picture}
                                                            onChange={handleInputChange}
                                                            placeholder="https://example.com/your-photo.jpg"
                                                            className="url-input"
                                                        />
                                                    </div>
                                                    <p className="url-hint">
                                                        Masukkan URL gambar yang valid (contoh: https://example.com/foto.jpg)
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Nama Lengkap</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                disabled={!editMode}
                                                className={editMode ? 'editable' : ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                disabled={!editMode}
                                                className={editMode ? 'editable' : ''}
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label>Role</label>
                                            <input
                                                type="text"
                                                value={user?.role || 'donor'}
                                                disabled
                                                className="disabled-input"
                                            />
                                        </div>
                                    </div>

                                    {editMode && (
                                        <div className="form-actions">
                                            <button type="submit" className="save-btn">
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {/* Donations Tab */}
                        {activeTab === 'donations' && (
                            <div className="donations-section">
                                <div className="section-header">
                                    <h2>Riwayat Donasi</h2>
                                    <div className="donation-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Total Donasi</span>
                                            <span className="stat-value">
                                                {formatCurrency(donations.reduce((sum, d) => sum + (d.amount || 0), 0))}
                                            </span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Jumlah Donasi</span>
                                            <span className="stat-value">{donations.length} kali</span>
                                        </div>
                                    </div>
                                </div>

                                {donations.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">💝</div>
                                        <h3>Belum Ada Donasi</h3>
                                        <p>Anda belum melakukan donasi apapun. Ayo mulai berdonasi sekarang!</p>
                                        <a href="/event-campaign" className="donate-now-btn">
                                            Donasi Sekarang
                                        </a>
                                    </div>
                                ) : (
                                    <div className="donations-list">
                                        {donations.map((donation, index) => (
                                            <div key={donation.donation_id || index} className="donation-card">
                                                <div className="donation-header">
                                                    <div className="donation-id">
                                                        #{donation.donation_id || `DON-${index + 1}`}
                                                    </div>
                                                    <div className={`donation-status ${donation.anonymous ? 'anonymous' : 'public'}`}>
                                                        {donation.anonymous ? 'Anonim' : 'Publik'}
                                                    </div>
                                                </div>
                                                
                                                <div className="donation-body">
                                                    <div className="donation-info">
                                                        <div className="info-row">
                                                            <span className="info-label">Jumlah Donasi</span>
                                                            <span className="info-value amount">
                                                                {formatCurrency(donation.amount || 0)}
                                                            </span>
                                                        </div>
                                                        <div className="info-row">
                                                            <span className="info-label">Tanggal</span>
                                                            <span className="info-value">
                                                                {formatDate(donation.createdAt || new Date())}
                                                            </span>
                                                        </div>
                                                        {donation.message && (
                                                            <div className="info-row">
                                                                <span className="info-label">Pesan</span>
                                                                <span className="info-value message">
                                                                    "{donation.message}"
                                                                </span>
                                                            </div>
                                                        )}
                                                        {donation.campaign_id && (
                                                            <div className="info-row">
                                                                <span className="info-label">Campaign ID</span>
                                                                <span className="info-value campaign-id">
                                                                    {donation.campaign_id}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="security-section">
                                <div className="section-header">
                                    <h2>Keamanan Akun</h2>
                                </div>

                                <form className="security-form">
                                    <div className="security-notice">
                                        <div className="notice-icon">🔐</div>
                                        <p>
                                            Untuk keamanan akun Anda, pastikan password Anda kuat dan tidak dibagikan kepada siapapun.
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>Password Saat Ini</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan password saat ini"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Password Baru</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan password baru"
                                        />
                                        <div className="password-hint">
                                            Password minimal 6 karakter
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Konfirmasi Password Baru</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Konfirmasi password baru"
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button 
                                            type="button" 
                                            className="save-btn"
                                            onClick={handleProfileUpdate}
                                        >
                                            Ubah Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;