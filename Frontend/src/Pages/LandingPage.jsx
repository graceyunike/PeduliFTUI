import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import TrustGauge from "../Components/TrustGauge.jsx";
import { getTrustStats } from "../services/api.js";

import logo from "../assets/logo.svg";
import homepageKiri from "../assets/homepagekiri.svg";
import homepageKanan from "../assets/homepagekanan.svg";
import pengmas3 from "../assets/pengmas3.svg";
import pengmas4 from "../assets/pengmas4.svg";

const LandingPage = () => {
    const [trustPercentage, setTrustPercentage] = useState(0);
    const [trustStats, setTrustStats] = useState(null);
    const [loadingTrust, setLoadingTrust] = useState(true);

    useEffect(() => {
        const fetchTrustStats = async () => {
            try {
                const stats = await getTrustStats();
                setTrustStats(stats);
                setTrustPercentage(stats.trustPercentage || 0);
            } catch (error) {
                console.error('Failed to fetch trust stats:', error);
                // Set default value if fetch fails
                setTrustPercentage(85);
            } finally {
                setLoadingTrust(false);
            }
        };

        // Fetch immediately on mount
        fetchTrustStats();

        // Set up polling every 10 seconds to refresh trust stats
        const interval = setInterval(fetchTrustStats, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
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
            <div className="w-full bg-white py-24 px-6 flex justify-center">
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

            {/* ========================= TRUST SECTION ========================= */}
            <div className="w-full bg-gradient-to-b from-[#F0FFFE] to-white py-24 px-6 flex justify-center">
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

                            <div className="pt-4">
                                <button className="px-8 py-3 bg-gradient-to-r from-[#A2FF59] to-[#13A3B5] text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                                    Learn More
                                </button>
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
