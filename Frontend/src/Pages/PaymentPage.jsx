import { useState, useEffect } from 'react';
import '../PaymentPage.css';
import Navbar from '../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCampaignById, getCurrentUser, createDonation, fetchUserById } from '../services/api';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passed = location.state || {};
    const campaignId = passed.campaign_id || passed.campaignId || null;

    const [campaign, setCampaign] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const loadCampaignData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!campaignId) throw new Error('No campaign selected');

                const campaignData = await fetchCampaignById(campaignId);
                const mappedCampaign = {
                    campaign_id: campaignData.campaign_id,
                    title: campaignData.title,
                    description: campaignData.description,
                    image_url: campaignData.image_url || campaignData.picture || '',
                    organizer_id: campaignData.organizer_id,
                    goal_amount: campaignData.goal_amount || 0,
                    collected_amount: campaignData.collected_amount || 0,
                    deadline: campaignData.deadline || campaignData.updatedAt || campaignData.createdAt || null
                };

                if (mounted) setCampaign(mappedCampaign);

                // Load organizer information
                if (mappedCampaign.organizer_id) {
                    await loadOrganizerInfo(mappedCampaign.organizer_id, mounted);
                }
            } catch (err) {
                console.error('Failed to load campaign for payment', err);
                if (mounted) setError(err.message || 'Failed to load campaign');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const loadOrganizerInfo = async (organizerId, isMounted) => {
            try {
                const organizerData = await fetchUserById(organizerId);
                if (isMounted && organizerData) {
                    setOrganizer({
                        name: organizerData.name || organizerData.full_name || organizerData.username || organizerData.email || organizerId,
                        profile_picture: organizerData.profile_picture || organizerData.avatar || ''
                    });
                }
            } catch (orgErr) {
                console.warn('Failed to load organizer info', orgErr);
            }
        };

        loadCampaignData();

        return () => { mounted = false; };
    }, [campaignId]);

    const handleSubmit = async () => {
        try {
            const user = getCurrentUser();
            if (!user) throw new Error('User must be logged in to donate');
            if (!campaign) throw new Error('No campaign selected');

            const donationAmount = Number(String(amount).replace(/[^0-9.-]+/g, ''));
            if (!donationAmount || donationAmount <= 0) {
                throw new Error('Masukkan jumlah donasi yang valid');
            }

            const donationPayload = {
                campaign_id: campaign.campaign_id,
                amount: donationAmount,
                message: message || ''
            };

            if (!isAnonymous) {
                donationPayload.donor_id = user.user_id;
            }

            // always include explicit anonymous flag so backend can record intent
            donationPayload.anonymous = !!isAnonymous;

            await createDonation(donationPayload);

            // Refresh campaign data to update collected amount
            const refreshedCampaign = await fetchCampaignById(campaign.campaign_id);
            setCampaign(prev => ({
                ...prev,
                collected_amount: refreshedCampaign.collected_amount || prev.collected_amount
            }));

            alert('Donasi berhasil. Terima kasih!');
            navigate('/');
        } catch (err) {
            console.error('Donation failed', err);
            alert(err.message || 'Gagal mengirim donasi');
        }
    };

    const handlePayNow = async () => {
        const user = getCurrentUser();   // <= FIX

        if (!user) {
            alert("Anda harus login terlebih dahulu");
            return;
        }

        if (!amount || amount <= 0) {
            alert("Masukkan jumlah donasi");
            return;
        }

        try {
            const orderId = "ORDER-" + Date.now();

            const res = await fetch("http://localhost:3000/payments/create-transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order_id: orderId,
                    amount: Number(amount),
                    donor_name: user.name || "Anonymous",   // <= FIX
                    donor_email: user.email || "noemail@example.com",   // <= FIX
                })
            });

            const data = await res.json();

            if (!data.token) {
                alert("Gagal mendapatkan token Midtrans");
                return;
            }

            window.snap.pay(data.token, {
                onSuccess: async () => {
                    await createDonation({
                        donation_id: orderId,
                        campaign_id: campaignId,
                        user_id: user.user_id,  // <= FIX
                        user_name: isAnonymous ? "Anonymous" : user.name,  // <= FIX
                        message,
                        amount: Number(amount),
                        anonymous: isAnonymous,
                    });

                    alert("Pembayaran Berhasil!");
                    navigate('/');
                },

                onPending: (res) => console.log("Pending:", res),
                onError: (res) => console.log("Error:", res),
                onClose: () => console.log("Popup ditutup user")
            });

        } catch (err) {
            console.error(err);
            alert("Terjadi error saat memproses pembayaran");
        }
    };



    const handleAmountChange = (e) => {
        // keep amount as string; conversion to number happens on submit
        setAmount(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="error-container">
                {error || 'Campaign tidak ditemukan'}
            </div>
        );
    }

    const progressPercentage = Math.round((campaign.collected_amount / (campaign.goal_amount || 1)) * 100);

    return (
        <>
            <Navbar />
            <div className="page-container">
                <main className="main-content">
                    <div className="payment-layout">
                        {/* Campaign Info Section - Left Side */}
                        <section className="campaign-section">
                            <div className="campaign-info-card">
                                <h1 className="campaign-title">{campaign.title}</h1>

                                <div className="campaign-description">
                                    <p>{campaign.description}</p>
                                </div>

                                <div className="organizer-info">
                                    {organizer ? (
                                        <>
                                            <img
                                                src={organizer.profile_picture}
                                                alt={organizer.name}
                                                className="organizer-avatar"
                                            />
                                            <div className="organizer-details">
                                                <span className="organizer-label">Diselenggarakan oleh</span>
                                                <span className="organizer-name">{organizer.name}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="organizer-name">{campaign.organizer_id}</span>
                                    )}
                                </div>

                                <div className="progress-section">
                                    <div className="progress-stats">
                                        <div className="progress-stat">
                                            <span className="progress-value">{progressPercentage}%</span>
                                            <span className="progress-label">Terkumpul</span>
                                        </div>
                                        <div className="progress-stat">
                                            <span className="progress-value">
                                                Rp {campaign.collected_amount.toLocaleString('id-ID')}
                                            </span>
                                            <span className="progress-label">Dari target</span>
                                        </div>
                                        <div className="progress-stat">
                                            <span className="progress-value">
                                                Rp {campaign.goal_amount.toLocaleString('id-ID')}
                                            </span>
                                            <span className="progress-label">Target</span>
                                        </div>
                                    </div>

                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Donation Form Section - Right Side */}
                        <section className="donation-section">
                            <div className="donation-card">
                                <div className="donation-header">
                                    <h2 className="donation-title">Buat Donasi</h2>
                                    <p className="donation-subtitle">Bantu wujudkan campaign ini</p>
                                </div>

                                <div className="donation-form">
                                    {/* Amount Input */}
                                    <div className="form-group">
                                        <label className="form-label">Jumlah Donasi</label>
                                        <div className="amount-input-container">
                                            <span className="currency-symbol">Rp</span>
                                            <input
                                                className="donation-amount-input"
                                                type="number"
                                                placeholder="Masukkan jumlah donasi"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                min={0}
                                            />
                                        </div>
                                        <div className="amount-suggestions">
                                            <button
                                                type="button"
                                                className="amount-suggestion"
                                                onClick={() => setAmount('25000')}
                                            >
                                                Rp 25.000
                                            </button>
                                            <button
                                                type="button"
                                                className="amount-suggestion"
                                                onClick={() => setAmount('50000')}
                                            >
                                                Rp 50.000
                                            </button>
                                            <button
                                                type="button"
                                                className="amount-suggestion"
                                                onClick={() => setAmount('100000')}
                                            >
                                                Rp 100.000
                                            </button>
                                            <button
                                                type="button"
                                                className="amount-suggestion"
                                                onClick={() => setAmount('250000')}
                                            >
                                                Rp 250.000
                                            </button>
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div className="form-group">
                                        <label className="form-label">Pesan Dukungan (Opsional)</label>
                                        <textarea
                                            className="donation-message-textarea"
                                            placeholder="Tulis pesan penyemangat untuk campaign ini..."
                                            rows={4}
                                            value={message}
                                            onChange={handleMessageChange}
                                        />
                                        <div className="character-count">
                                            {message.length}/200 karakter
                                        </div>
                                    </div>

                                    {/* Anonymous Checkbox */}
                                    <div className="form-group">
                                        <div className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                id="anonim"
                                                checked={isAnonymous}
                                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                                className="anonymous-checkbox"
                                            />
                                            <label htmlFor="anonim" className="anonymous-label">
                                                <span className="checkbox-custom"></span>
                                                Sembunyikan identitas saya (Donasi Anonim)
                                            </label>
                                        </div>
                                        <p className="anonymous-description">
                                            Nama dan profil Anda tidak akan ditampilkan di halaman donatur
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        className="submit-donation-btn"
                                        type="button"
                                        onClick={handlePayNow}
                                        disabled={!amount || amount <= 0}
                                    >
                                        <span className="btn-text">Donasi Sekarang</span>
                                        <span className="btn-amount">
                                            {amount ? `Rp ${parseInt(amount).toLocaleString('id-ID')}` : ''}
                                        </span>
                                    </button>
                                    <p className="security-notice">
                                        🔒 Donasi Anda aman dan terjamin keamanannya
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default PaymentPage;