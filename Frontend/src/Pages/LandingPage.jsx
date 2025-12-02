import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import TrustGauge from "../Components/TrustGauge.jsx";
import { getTrustStats, fetchCampaigns } from "../services/api.js";

import logo from "../assets/logo.svg";
import homepageKiri from "../assets/homepagekiri.svg";
import homepageKanan from "../assets/homepagekanan.svg";
import pengmas3 from "../assets/pengmas3.svg";
import pengmas4 from "../assets/pengmas4.svg";

const LandingPage = () => {
    const [trustPercentage, setTrustPercentage] = useState(0);
    const [trustStats, setTrustStats] = useState(null);
    const [loadingTrust, setLoadingTrust] = useState(true);
    
    const [latestCampaign, setLatestCampaign] = useState(null);
    const [loadingCampaign, setLoadingCampaign] = useState(true);

    useEffect(() => {
        const fetchTrustStats = async () => {
            try {
                const stats = await getTrustStats();
                setTrustStats(stats);
                setTrustPercentage(stats.trustPercentage || 0);
            } catch (error) {
                console.error('Failed to fetch trust stats:', error);
                setTrustPercentage(85);
            } finally {
                setLoadingTrust(false);
            }
        };

        fetchTrustStats();
        const interval = setInterval(fetchTrustStats, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fetch latest campaign
    useEffect(() => {
        let mounted = true;
        const loadLatestCampaign = async () => {
            setLoadingCampaign(true);
            try {
                const campaigns = await fetchCampaigns();
                if (campaigns && campaigns.length > 0) {
                    // Sort by createdAt descending to get latest
                    const sorted = campaigns.sort((a, b) => {
                        const dateA = new Date(a.createdAt || 0);
                        const dateB = new Date(b.createdAt || 0);
                        return dateB - dateA;
                    });
                    
                    const latest = sorted[0];
                    if (mounted) {
                        setLatestCampaign({
                            campaign_id: latest.campaign_id,
                            title: latest.title,
                            description: latest.description,
                            picture: latest.image_url || latest.picture || '',
                            goal_amount: latest.goal_amount || 0,
                            collected_amount: latest.collected_amount || 0,
                            deadline: latest.deadline || latest.createdAt
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to fetch latest campaign:', error);
            } finally {
                if (mounted) setLoadingCampaign(false);
            }
        };

        loadLatestCampaign();
        return () => { mounted = false; };
    }, []);

    // Helper function to calculate percentage
    const calculatePercentage = (collected, goal) => {
        if (goal === 0) return 0;
        return Math.round((collected / goal) * 100);
    };

    return (
        <div className="animate-fadeUp">
            <Navbar />

            {/* ========================= HERO SECTION ========================= */}
            <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">

                <img
                    src={homepageKiri}
                    alt="Left Illustration"
                    className="absolute left-0 top-0 h-full w-1/2 object-cover z-0"
                />

                <img
                    src={homepageKanan}
                    alt="Right Illustration"
                    className="absolute right-0 top-0 h-full w-1/2 object-cover z-0"
                />

                <div className="absolute inset-0 bg-gradient-to-b 
                    from-[#A2FF59]/50 via-[#13A3B5]/50 to-[#005384]/50 z-10">
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <img
                        src={logo}
                        alt="PeduliFTUI Logo"
                        className="w-[250px] md:w-[350px] lg:w-[430px]"
                    />
                </div>
            </div>

            {/* ========================= ABOUT US SECTION ========================= */}
            <div id="about-section" className="w-full bg-white py-24 px-6 flex justify-center">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT TEXT */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <p className="text-primary text-lg font-normal">Who We Are</p>
                            <div className="border-b border-primary w-20"></div>
                        </div>

                        <h2 className="text-primary text-4xl font-semibold mt-2 mb-6">
                            ABOUT US
                        </h2>

                        <p className="text-black/80 text-lg leading-relaxed">
                            PeduliFTUI adalah inisiatif sosial mahasiswa Fakultas Teknik
                            Universitas Indonesia yang bergerak melalui kampanye donasi,
                            kegiatan volunteer, dan program pemberdayaan masyarakat.
                            Berangkat dari keyakinan bahwa memberi bukan hanya soal donasi,
                            tetapi tentang membawa perubahan nyata, PeduliFTUI ingin 
                            menumbuhkan budaya peduli dan tanggung jawab sosial di 
                            kalangan mahasiswa dan masyarakat.
                            <br /><br />
                            Dengan program yang berkelanjutan dan kolaborasi yang terbuka,
                            PeduliFTUI terus berupaya mendukung mereka yang membutuhkan 
                            serta menginspirasi terciptanya lingkungan yang lebih inklusif 
                            dan penuh kepedulian.
                        </p>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="relative flex justify-center lg:justify-end">
                        
                        {/* Main Image */}
                        <img 
                            src={pengmas3}
                            className="w-[370px] md:w-[420px] object-cover rounded-xl shadow-lg"
                        />

                        {/* Overlapping second image */}
                        <img 
                            src={pengmas4}
                            className="
                                w-[240px] md:w-[260px] 
                                object-cover rounded-xl shadow-md
                                absolute top-40 -left-4 lg:-left-12
                            "
                        />
                    </div>

                </div>
            </div>

            {/* ========================= EVENT CAMPAIGN SECTION ========================= */}
            <div id="event-campaign-section" className="w-full bg-white py-24 px-6 flex justify-center">
                <div className="max-w-6xl w-full">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">
                            Events Campaign
                        </h2>
                        <a 
                            href="/event-campaign" 
                            className="text-primary font-semibold hover:underline text-lg"
                        >
                            View All
                        </a>
                    </div>

                    {/* Campaign Content */}
                    {loadingCampaign ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin" />
                        </div>
                    ) : latestCampaign ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            
                            {/* LEFT - CAMPAIGN IMAGE */}
                            <div className="flex justify-center">
                                <img 
                                    src={latestCampaign.picture}
                                    alt={latestCampaign.title}
                                    className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg"
                                />
                            </div>

                            {/* RIGHT - CAMPAIGN INFO */}
                            <div className="space-y-6">
                                
                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-primary">
                                    {latestCampaign.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    {latestCampaign.description.length > 200
                                        ? latestCampaign.description.substring(0, 200) + "..."
                                        : latestCampaign.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {calculatePercentage(latestCampaign.collected_amount, latestCampaign.goal_amount)}%
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            Goals 100%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-300 rounded-full h-3">
                                        <div 
                                            className="h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${calculatePercentage(latestCampaign.collected_amount, latestCampaign.goal_amount)}%`,
                                                background: 'linear-gradient(90deg, #A2FF59 0%, #13A3B5 100%)'
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Terkumpul: Rp {latestCampaign.collected_amount.toLocaleString('id-ID')}
                                    </p>
                                </div>

                                {/* Donate Button */}
                                <a 
                                    href={`/event-detail/${latestCampaign.campaign_id}`}
                                    className="inline-block bg-gradient-to-r from-[#A2FF59] to-[#13A3B5] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    View Campaign
                                </a>

                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada campaign yang tersedia
                        </div>
                    )}

                </div>
            </div>

            {/* ========================= TRUST SECTION ========================= */}
            <div id="sentiments-section" className="w-full bg-gradient-to-b from-[#F0FFFE] to-white py-24 px-6 flex justify-center">
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <p className="text-primary text-lg font-normal">Platform Reliability</p>
                            <div className="border-b border-primary w-20"></div>
                        </div>
                        <h2 className="text-primary text-4xl font-semibold">
                            Why Trust PeduliFTUI
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT - TRUST GAUGE */}
                        <div className="flex justify-center">
                            {!loadingTrust ? (
                                <div className="flex flex-col items-center">
                                    <TrustGauge percentage={trustPercentage} size={280} />
                                    <p className="text-sm text-gray-600 mt-6 text-center">
                                        Based on {trustStats?.totalComments || 0} verified donors comments
                                    </p>
                                </div>
                            ) : (
                                <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-100 rounded-full">
                                    <p className="text-gray-500">Loading trust data...</p>
                                </div>
                            )}
                        </div>

                        {/* RIGHT - TRUST INFORMATION */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-primary">
                                    Transparency & Accountability
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Setiap donasi yang masuk dicatat dengan transparan dan dilaporkan 
                                    secara berkala kepada para donator. Kami berkomitmen untuk memberikan 
                                    akuntabilitas penuh atas setiap rupiah yang diterima.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-primary">
                                    Donor Verified
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Rating kami berdasarkan feedback langsung dari donatur selama menggunakan platform kami.
                                    Komentar mereka memberikan gambaran langsung tentang bagaimana layanan kami membantu mempermudah proses berdonasi dan memastikan bantuan tiba kepada yang membutuhkan.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-primary">
                                    Up-to-Date
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Setiap campaign selalu diperbarui secara berkala sehingga donatur akan mendapatkan informasi yang tersentralisasi di platform kami, relevan, akurat, dan terpercaya
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default LandingPage;
