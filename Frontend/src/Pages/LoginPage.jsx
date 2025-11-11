import React from "react";
import { Link } from "react-router-dom";
import LogoTangan from "../assets/logotangan.svg";
import Logo from "../assets/logo.svg";

export default function LoginPage() {
    return (
        <div className="flex h-screen">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center relative">
            <img src={LogoTangan} alt="Hand Logo" className="w-[350px] mb-6" />
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

        {/* RIGHT SIDE - Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center border-l border-[#BE3C44] bg-gradient-to-b from-[#005384] via-[#13A3B5] to-[#A2FF59]">
            <h2 className="text-5xl font-bold text-white mb-12">Login</h2>

            {/* Form */}
            <form className="flex flex-col gap-6 w-[460px]">
            <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#F2F2F2] border border-[#005384] rounded-md p-3 text-[#005384] placeholder:text-[#005384]/70 focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
            />
            <input
                type="password"
                placeholder="Enter your password"
                className="bg-[#F2F2F2] border border-[#005384] rounded-md p-3 text-[#005384] placeholder:text-[#005384]/70 focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
            />
            <button
                type="submit"
                className="bg-[#005384] hover:bg-[#00446B] text-white font-semibold text-xl rounded-md py-3 transition"
            >
                Login
            </button>
            </form>

            {/* Bottom text */}
            <p className="text-white text-base mt-6">
            Don’t have an account?{" "}
            <Link
                to="/register"
                className="font-semibold underline hover:text-[#005384]/80 transition"
            >
                Register now
            </Link>
            </p>
        </div>
        </div>
    );
}
