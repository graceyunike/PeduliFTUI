// src/Pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventData } from './eventData';
import { timelineData } from './timelineData';
import Navbar from '../Components/Navbar.jsx';

const EventDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil id dari URL: /event-detail/:id
    const [campaign, setCampaign] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const cid = parseInt(id);
        const foundCampaign = eventData.find(item => item.campaign_id === cid);
        const foundTimeline = timelineData.filter(item => item.campaign_id === cid);

        setCampaign(foundCampaign);
        setTimeline(foundTimeline);
    }, [id]);

    if (!campaign) {
        return <div className="text-center py-10">Event tidak ditemukan</div>;
    }

    // Hitung persentase donasi
    const percentage = Math.round((campaign.collected_amount / campaign.goal_amount) * 100);

    // Format tanggal
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
        <Navbar />
        
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* ===== LEFT SECTION: Detail Campaign ===== */}
                <div className="lg:w-2/3 space-y-6">
                    {/* Gambar & Judul */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <img
                            src={campaign.picture}
                            alt={campaign.title}
                            className="w-full md:w-1/3 h-auto rounded-xl object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-[#005384] mb-2">
                                {campaign.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Dibuat oleh:</span>
                                <span className="text-[#13A3B5] font-semibold">{campaign.created_by}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                pada {formatDateTime(campaign.deadline)} WIB
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                                className="bg-[#A2FF59] h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span>{percentage}% Terkumpul</span>
                            <span>Tujuan 100%</span>
                        </div>
                    </div>

                    {/* Deadline & Donasi */}
                    <div className="mt-4">
                        <p className="text-[#13A3B5] font-bold text-lg">
                            Donasi dibuka hingga: {formatDate(campaign.deadline)}
                        </p>
                    </div>

                    {/* Deskripsi */}
                    <div className="mt-4">
                        <h3 className="font-bold text-2xl text-[#005384] mb-2">Deskripsi</h3>
                        <div className="text-gray-700 leading-relaxed">
                            {showFullDescription || campaign.description.length <= 200
                                ? campaign.description
                                : campaign.description.substring(0, 200) + '...'}
                        </div>

                        {campaign.description.length > 200 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="mt-1 text-[#13A3B5] font-semibold text-sm hover:underline focus:outline-none"
                            >
                                {showFullDescription ? 'See less' : 'See more...'}
                            </button>
                        )}
                    </div>

                    {/* Button Donasi */}
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/payment', { state: { campaign_id: campaign.campaign_id } })}
                            className="w-full py-3 bg-[#13A3B5] text-white font-semibold rounded-lg hover:bg-[#0f8b9d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
                        >
                            Donasi Sekarang
                        </button>
                    </div>
                </div>

                {/* ===== RIGHT SECTION: Timeline Post ===== */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-[#C9EAEE] rounded-xl p-6">
                        <h2 className="font-bold text-lg text-[#13A3B5] mb-4">Timeline Post</h2>

                        {timeline.map((post, index) => (
                            <div key={post.id} className={`mb-4 p-6 rounded-lg ${index === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                {/* Header: Author */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                                        {campaign.created_by.charAt(0)}
                                    </div>
                                    <span className="font-semibold text-sm">{campaign.created_by}</span>
                                </div>

                                {/* Content */}
                                <p className="text-sm text-gray-700 mb-4">
                                    {post.content.length > 100
                                        ? post.content.substring(0, 100) + "..."
                                        : post.content}
                                    {post.content.length > 100 && <span className="text-[#13A3B5] cursor-pointer ml-1">Show more</span>}
                                </p>

                                {/* Media */}
                                {post.media_url && (
                                    <img
                                        src={post.media_url}
                                        alt="Post media"
                                        className="w-full h-auto rounded-lg my-2 p-2"
                                    />
                                )}


                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    );
};

export default EventDetailPage;