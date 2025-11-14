import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/api";
import LogoTangan from "../assets/logotangan.svg";
import Logo from "../assets/logo.svg";

export default function RegistrationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!name || !email || !password) {
                setError("Semua field harus diisi");
                setLoading(false);
                return;
            }

            if (password.length < 6) {
                setError("Password minimal 6 karakter");
                setLoading(false);
                return;
            }

            // Register user
            const registerResult = await registerUser(name, email, password);

            // Jika registrasi berhasil, langsung login
            const loginResult = await loginUser(email, password);

            // Arahkan ke halaman utama atau dashboard (SEMENTARA)
            navigate("/login");
        } catch (err) {
            setError(err.message || "Registrasi gagal. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };
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

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-[#005384] via-[#13A3B5] to-[#A2FF59] p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 md:mb-10">
            Registration
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 w-full max-w-[460px]">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-base md:text-lg font-light focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
            />
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-base md:text-lg font-light focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
            />
            <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#F2F2F2] border border-[#005384] rounded-md px-4 py-3 text-[#005384] placeholder-[#005384] text-base md:text-lg font-light focus:outline-none focus:ring-2 focus:ring-[#13A3B5]"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-[#005384] hover:bg-[#01395f] disabled:bg-gray-400 text-white font-semibold text-lg md:text-xl py-3 rounded-md transition"
            >
                {loading ? "Loading..." : "Register Now"}
            </button>

            <p className="text-[#005384] text-base md:text-lg font-medium text-center mt-4">
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
