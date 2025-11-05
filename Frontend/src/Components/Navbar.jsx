import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full h-[70px] bg-[#13A3B5]/90 flex items-center justify-between px-10 shadow-md z-50">
        {/* LEFT SIDE - LOGO */}
        <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="PeduliFTUI Logo" className="w-[150px] h-auto" />
        </Link>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-10">
            <Link
            to="/profile"
            className="text-[#005384] font-bold text-[19px] hover:underline transition"
            >
            Profile
            </Link>
            <Link
            to="/about"
            className="text-white font-bold text-[19px] hover:underline transition"
            >
            About
            </Link>
            <Link
            to="/event"
            className="text-white font-bold text-[19px] hover:underline transition"
            >
            Event Campaign
            </Link>
            <Link
            to="/sentiments"
            className="text-white font-bold text-[19px] hover:underline transition"
            >
            Sentiments
            </Link>
        </div>

        {/* RIGHT SIDE - BUTTONS */}
        <div className="flex items-center gap-6">
            <button className="bg-white text-[#005384] font-bold text-[19px] px-5 py-2 rounded-lg shadow-md hover:bg-[#f0f0f0] transition">
            Donate
            </button>
            <Link
            to="/contact"
            className="text-white font-bold text-[19px] hover:underline transition"
            >
            Contact Us
            </Link>
        </div>
        </nav>
    );
}
