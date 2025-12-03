import React, { useState, useEffect } from 'react';

const DonationCarousel = ({ donations }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(null);

    // Filter donations that have messages
    const messagesWithDonor = donations.filter(donation => donation.message && donation.message.trim());

    useEffect(() => {
        if (messagesWithDonor.length === 0) return;

        // Auto-slide every 5 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messagesWithDonor.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [messagesWithDonor.length]);

    useEffect(() => {
        if (messagesWithDonor.length > 0) {
            setDisplayMessage(messagesWithDonor[currentIndex]);
        }
    }, [currentIndex, messagesWithDonor]);

    if (messagesWithDonor.length === 0) {
        return null; // Don't render if no messages
    }

    const currentDonation = displayMessage;
    const donorName = currentDonation?.anonymous 
        ? 'Orang Baik' 
        : (currentDonation?.donor_name || 'Donor');
    const profilePicture = !currentDonation?.anonymous ? currentDonation?.donor_profile_picture : null;

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="font-bold text-lg text-[#13A3B5] mb-6">Pesan Donatur</h2>

            {/* Carousel Container */}
            <div className="relative overflow-hidden min-h-[120px] flex items-center">
                {/* Slide Content with Fade Animation */}
                <div
                    key={currentIndex}
                    className="w-full animate-fadeIn"
                >
                    {/* Donor Info */}
                    <div className="flex items-center gap-3 mb-3">
                        {/* Profile Picture or Icon */}
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt={donorName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-[#A2FF59] to-[#13A3B5] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {donorName.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div>
                            <p className="font-semibold text-[#13A3B5]">
                                {donorName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(currentDonation?.createdAt).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 leading-relaxed italic text-sm border-l-4 border-[#13A3B5] pl-4">
                        "{currentDonation?.message}"
                    </p>

                    {/* Amount */}
                    <p className="text-[#13A3B5] font-bold text-sm mt-3">
                        Rp {currentDonation?.amount?.toLocaleString('id-ID') || 0}
                    </p>
                </div>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {messagesWithDonor.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentIndex
                                ? 'bg-[#13A3B5] w-6'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to message ${index + 1}`}
                    />
                ))}
            </div>

            {/* Counter */}
            <p className="text-center text-xs text-gray-500 mt-3">
                {currentIndex + 1} dari {messagesWithDonor.length} pesan
            </p>
        </div>
    );
};

export default DonationCarousel;
