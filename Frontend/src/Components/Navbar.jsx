import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.svg";

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#13A3B5]/90 backdrop-blur-md shadow-sm">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[70px] px-6">

                {/* LEFT — LOGO */}
                <NavLink to="/" className="flex items-center flex-shrink-0">
                    <img 
                        src={Logo}
                        alt="PeduliFTUI Logo"
                        className="h-[48px] w-auto"
                    />
                </NavLink>

                {/* CENTER — MENU (Hidden on mobile) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 text-white font-semibold text-[17px]">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-[#FFD700] underline" : "hover:text-[#E0E0E0] transition"
                        }
                    >
                        Home
                    </NavLink>

                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('about-section');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hover:text-[#E0E0E0] transition"
                    >
                        About
                    </Link>

                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('event-campaign-section');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={({ isActive }) =>
                            isActive ? "text-[#FFD700] underline" : "hover:text-[#E0E0E0] transition"
                        }
                    >
                        Event Campaign
                    </Link>

                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('sentiments-section');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hover:text-[#E0E0E0] transition"
                    >
                        Sentiments
                    </Link>

                </div>

                {/* RIGHT — AUTH SECTION */}
                <div className="flex items-center gap-4 md:gap-6 text-white font-semibold text-sm md:text-[17px]">

                    {user ? (
                        <>
                            {/* User Name Display */}
                            <span className="hidden sm:inline text-white font-medium">
                                {user.name || user.username || "User"}
                            </span>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-5 py-2 rounded-xl font-bold shadow transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login Link */}
                            <Link
                                to="/login"
                                className="text-white hover:text-[#FFD700] transition font-semibold"
                            >
                                Login
                            </Link>

                            {/* Donate Button */}
                            <Link
                                to="/event-campaign"
                                className="bg-white text-[#005384] px-4 md:px-5 py-2 rounded-xl font-bold shadow hover:bg-[#f5f5f5] transition"
                            >
                                Donate
                            </Link>
                        </>
                    )}
                </div>

            </div>

            {/* MOBILE MENU */}
            <div className="md:hidden flex flex-wrap justify-center gap-3 py-3 text-white font-semibold text-[14px] bg-[#13A3B5]">
                <NavLink to="/" className="hover:text-[#FFD700] transition">Home</NavLink>
                <Link 
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('about-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FFD700] transition"
                >About</Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('event-campaign-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FFD700] transition"
                >Campaign</Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('sentiments-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FFD700] transition"
                >Sentiments</Link>
                
                {user && (
                    <>
                        <span className="w-full text-center text-sm">👤 {user.name || user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-bold w-full transition-colors"
                        >
                            Logout
                        </button>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login" className="bg-white text-[#005384] px-3 py-1 rounded-lg font-bold w-full text-center hover:bg-[#f5f5f5] transition">
                            Login
                        </Link>
                        <Link to="/event-campaign" className="bg-[#A2FF59] text-[#005384] px-3 py-1 rounded-lg font-bold w-full text-center hover:bg-[#8FDD3C] transition">
                            Donate
                        </Link>
                    </>
                )}
            </div>

        </nav>
    );
}
