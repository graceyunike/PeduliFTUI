import React, { useState, useEffect } from 'react';
import '../DashboardPage.css';
import { fetchCampaigns, getCurrentUser } from '../services/api';

const DashboardPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'campaign' or 'post'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const user = getCurrentUser();
                if (!user) throw new Error('User not logged in');
                if (mounted) setCurrentUser(user);

                const allCampaigns = await fetchCampaigns();
                const myCampaigns = allCampaigns.filter(c => c.organizer_id === user.user_id);

                const mapped = myCampaigns.map(c => ({
                    campaign_id: c.campaign_id,
                    title: c.title,
                    picture: c.image_url || c.picture || '',
                    description: c.description,
                    goal_amount: c.goal_amount || 0,
                    collected_amount: c.collected_amount || 0,
                    deadline: c.deadline || c.updatedAt || c.createdAt || null,
                    status: c.status === 'ongoing' ? 'Active' : (c.status || 'Unknown')
                }));

                if (mounted) setCampaigns(mapped);
            } catch (err) {
                console.error('Failed to load dashboard campaigns', err);
                if (mounted) setError(err.message || 'Failed to load campaigns');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const handleCreateCampaign = () => {
        setModalType('campaign');
        setShowCreateModal(true);
    };

    const handleCreatePost = () => {
        setModalType('post');
        setShowCreateModal(true);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Hitung persentase donasi
    const calculatePercentage = (collected, goal) => {
        return Math.round((collected / goal) * 100);
    };

    return (
        <div className="dashboard-container">
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Header Section */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">
                        Dashboard Organisasi
                    </h1>
                    <p className="dashboard-subtitle">Kelola campaign dan postingan donasi Anda</p>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            onClick={handleCreatePost}
                            className="btn-secondary"
                        >
                            <span>+</span> Create Post
                        </button>
                        <button
                            onClick={handleCreateCampaign}
                            className="btn-primary"
                        >
                            <span>+</span> Create Campaign
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Campaign</h3>
                        <p className="stat-number text-[#005384]">{campaigns.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Campaign Aktif</h3>
                        <p className="stat-number text-[#13A3B5]">
                            {campaigns.filter(camp => camp.status === 'Active').length}
                        </p>
                    </div>
                    <div className="stat-card">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Donasi</h3>
                        <p className="stat-number text-[#A2FF59]">
                            Rp {campaigns.reduce((total, camp) => total + camp.collected_amount, 0).toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                {/* Campaign List Section */}
                <div className="campaign-section">
                    <div className="section-header">
                        <h2 className="section-title">Campaign Donasi Saya</h2>
                        <p className="section-subtitle">Daftar campaign yang telah dibuat oleh {currentUser ? currentUser.name : 'organisasi Anda'}</p>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-12 h-12 border-4 border-t-transparent border-[#005384] rounded-full animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : campaigns.length === 0 ? (
                            <div className="empty-state">
                                <h3>Belum ada campaign yang dibuat</h3>
                                <p className="text-gray-500 mb-4">Mulai buat campaign pertama Anda untuk mengumpulkan donasi</p>
                                <button
                                    onClick={handleCreateCampaign}
                                    className="btn-primary"
                                >
                                    Buat Campaign Pertama
                                </button>
                            </div>
                        ) : (
                            <div className="campaigns-grid">
                                {campaigns.map((campaign) => (
                                    <div key={campaign.campaign_id} className="campaign-card">
                                        <img
                                            src={campaign.picture}
                                            alt={campaign.title}
                                            className="campaign-image"
                                        />
                                        <div className="campaign-content">
                                            <h3 className="campaign-title">
                                                {campaign.title}
                                            </h3>

                                            {/* Progress Bar */}
                                            <div className="progress-container">
                                                <div className="progress-header">
                                                    <span>{calculatePercentage(campaign.collected_amount, campaign.goal_amount)}%</span>
                                                    <span>Rp {campaign.goal_amount.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${calculatePercentage(campaign.collected_amount, campaign.goal_amount)}%` }}
                                                    ></div>
                                                </div>
                                                <p className="progress-text">
                                                    Terkumpul: Rp {campaign.collected_amount.toLocaleString('id-ID')}
                                                </p>
                                            </div>

                                            <div className="campaign-footer">
                                                <span className="deadline">Deadline: {formatDate(campaign.deadline)}</span>
                                                <span className={`status-badge ${campaign.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">
                            {modalType === 'campaign' ? 'Buat Campaign Baru' : 'Buat Postingan Baru'}
                        </h3>

                        {modalType === 'campaign' ? (
                            <form className="space-y-4">
                                <div className="form-group">
                                    <label className="form-label">Judul Campaign</label>
                                    <input type="text" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Deskripsi</label>
                                    <textarea className="form-textarea" rows="3"></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Target Donasi</label>
                                    <input type="number" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Deadline</label>
                                    <input type="date" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Gambar</label>
                                    <input type="file" className="form-file" />
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-4">
                                <div className="form-group">
                                    <label className="form-label">Konten Postingan</label>
                                    <textarea
                                        className="form-textarea"
                                        rows="4"
                                        placeholder="Bagikan update terbaru tentang campaign Anda..."
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Upload Media (Opsional)</label>
                                    <input type="file" className="form-file" />
                                </div>
                            </form>
                        )}

                        <div className="modal-actions">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="btn-submit"
                            >
                                {modalType === 'campaign' ? 'Buat Campaign' : 'Posting'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;