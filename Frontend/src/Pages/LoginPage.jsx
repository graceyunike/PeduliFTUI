import React from "react";
import { Link } from "react-router-dom";
import LogoTangan from "../assets/logotangan.svg";
import Logo from "../assets/logo.svg";

export default function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row h-auto md:h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-0">
            <img
            src={LogoTangan}
            alt="Hand Logo"
            className="w-40 md:w-[350px] mb-6"
            />
            <img
            src={Logo}
            alt="PeduliFTUI Logo"
            className="w-56 md:w-[400px] h-auto object-contain mb-6"
            />
            <p className="text-black font-serif italic text-center text-base md:text-[22px] px-4 md:px-10 mb-4">
            “Giving is not just about making a donation. <br />
            It is about making a difference.”
            </p>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-[#BE3C44] bg-gradient-to-b from-[#005384] via-[#13A3B5] to-[#A2FF59] p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12">
            Login
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-4 md:gap-6 w-full max-w-[460px]">
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

            <p className="text-white text-base md:text-lg font-medium text-center mt-6 md:mt-7">
            Don’t have an account?{" "}
            <Link
                to="/register"
                className="font-semibold hover:underline hover:text-[#01395f] transition"
            >
                Register now
            </Link>
            </p>
        </div>
        </div>
    );
}
