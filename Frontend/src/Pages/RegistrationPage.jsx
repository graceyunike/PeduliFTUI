import React from "react";
import { Link } from "react-router-dom";
import LogoTangan from "../assets/logotangan.svg";
import Logo from "../assets/logo.svg";

export default function RegistrationPage() {
    return (
        <div className="flex h-screen">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center relative">
            <img
            src={LogoTangan}
            alt="Hand Logo"
            className="w-[350px] mb-6"
            />
            <img 
                src={Logo} 
                alt="PeduliFTUI Logo" 
                className="w-[400px] h-auto object-contain mb-6"
            />
            <p className="text-black font-serif italic text-center text-[22px] px-10">
            “Giving is not just about making a donation. <br />
            It is about making a difference.”
            </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-[#005384] via-[#13A3B5] to-[#A2FF59]">
            <h2 className="text-white text-5xl font-bold mb-10">Registration</h2>
            <form className="flex flex-col w-[60%] max-w-[460px] gap-6">
            <input
                type="text"
                placeholder="Enter your name"
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-lg font-light"
            />
            <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-lg font-light"
            />
            <input
                type="password"
                placeholder="Create password"
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-lg font-light"
            />
            <button
                type="submit"
                className="bg-[#005384] text-white font-semibold text-xl py-3 rounded-md hover:bg-[#01395f] transition"
            >
                Register Now
            </button>

            <p className="text-[#005384] text-lg font-medium text-center">
                Already have an account?{" "}
                <Link
                to="/login"
                className="font-semibold hover:underline hover:text-[#01395f] transition"
                >
                Login now
                </Link>
            </p>
            </form>
        </div>
        </div>
    );
    }