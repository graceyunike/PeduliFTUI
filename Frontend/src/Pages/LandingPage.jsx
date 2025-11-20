import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

import logo from "../assets/logo.svg";
import homepageKiri from "../assets/homepagekiri.svg";
import homepageKanan from "../assets/homepagekanan.svg";
import pengmas3 from "../assets/pengmas3.svg";
import pengmas4 from "../assets/pengmas4.svg";

const LandingPage = () => {
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

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default LandingPage;
