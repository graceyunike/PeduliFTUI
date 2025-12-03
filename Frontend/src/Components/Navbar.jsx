import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.svg";

export default function Navbar() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();

    if (location.pathname !== '/' && activeSection !== '') {
        setActiveSection('');
    }

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

    const handleScrollToSection = (sectionId) => {
        return (e) => {
            e.preventDefault();
            const element = document.getElementById(sectionId);
            
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate("/");
                setTimeout(() => {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        };
    };

    const getUserDashboardLink = () => {
        if (!user) return "/login";
        const role = user.role?.toLowerCase();
        return (role === 'admin' || role === 'organizer') ? "/dashboard" : "/user-dashboard";
    };

    // Helper function untuk scroll ke paling atas
    const handleScrollToTop = () => {
        setActiveSection('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#13A3B5]/90 backdrop-blur-md shadow-sm">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[70px] px-6">

                {/* LEFT — LOGO (Ditambahkan onClick scroll to top) */}
                <NavLink 
                    to="/" 
                    className="flex items-center flex-shrink-0"
                    onClick={handleScrollToTop} 
                >
                    <img 
                        src={Logo}
                        alt="PeduliFTUI Logo"
                        className="h-[48px] w-auto"
                    />
                </NavLink>

                {/* CENTER — MENU */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 text-white font-semibold text-[17px]">

                    {/* HOME (Ditambahkan scroll to top) */}
                    <NavLink
                        to="/"
                        onClick={handleScrollToTop}
                        className={({ isActive }) =>
                            isActive && activeSection === '' 
                            ? "text-[#FFD700]" 
                            : "hover:text-[#FFD700] transition scale-105"
                        }
                    >
                        Home
                    </NavLink>

                    <Link
                        to="/"
                        onClick={(e) => {
                            handleScrollToSection('about-section')(e);
                            setActiveSection('about');
                        }}
                        className={activeSection === 'about' ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"}
                    >
                        About
                    </Link>

                    <NavLink
                        to="/event-campaign"
                        onClick={() => setActiveSection('')}
                        className={({ isActive }) =>
                            isActive ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"
                        }
                    >
                        Event Campaign
                    </NavLink>


                    <Link
                        to="/"
                        onClick={(e) => {
                            handleScrollToSection('sentiments-section')(e);
                            setActiveSection('sentiments');
                        }}
                        className={activeSection === 'sentiments' ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"}
                    >
                        Sentiments
                    </Link>

                    <NavLink
                        to="/timeline-posts"
                        onClick={() => setActiveSection('')}
                        className={({ isActive }) =>
                            isActive ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"
                        }
                    >
                        Timeline
                    </NavLink>

                </div>

                {/* RIGHT — AUTH SECTION */}
                <div className="flex items-center gap-4 md:gap-6 text-white font-semibold text-sm md:text-[17px]">
                    {user ? (
                        <>
                            <Link
                                to={getUserDashboardLink()}
                                className="hidden sm:flex items-center gap-2 text-white font-medium hover:text-[#FFD700] transition"
                            >
                                {user.profile_picture && (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.name || "User"}
                                        className="w-8 h-8 rounded-full object-cover border border-white"
                                    />
                                )}
                                <span className="hover:underline">{user.name || user.username || "User"}</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-5 py-2 rounded-xl font-bold shadow transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-[#FFD700] transition font-semibold"
                            >
                                Login
                            </Link>

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
                {/* Mobile Home juga ditambahkan scroll to top */}
                <NavLink 
                    to="/" 
                    onClick={handleScrollToTop}
                    className="hover:text-[#FFD700] transition"
                >
                    Home
                </NavLink>
                
                <Link 
                    to="/"
                    onClick={(e) => {
                        handleScrollToSection('about-section')(e);
                        setActiveSection('about');
                    }}
                    className={activeSection === 'about' ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"}
                >About</Link>
                <Link
                    to="/event-campaign"
                    className="hover:text-[#FFD700] transition"
                >Campaign</Link>


                <Link
                    to="/"
                    onClick={(e) => {
                        handleScrollToSection('sentiments-section')(e);
                        setActiveSection('sentiments');
                    }}
                    className={activeSection === 'sentiments' ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"}
                >Sentiments</Link>

                <NavLink
                    to="/timeline-posts"
                    onClick={() => setActiveSection('')}
                    className={({ isActive }) =>
                        isActive ? "text-[#FFD700]" : "hover:text-[#FFD700] transition"
                    }
                >
                    Timeline
                </NavLink>
                
                {user && (
                    <>
                        <Link 
                            to={getUserDashboardLink()}
                            className="w-full flex items-center justify-center gap-2 text-sm hover:text-[#FFD700] py-1"
                        >
                            {user.profile_picture && (
                                <img
                                    src={user.profile_picture}
                                    alt={user.name || "User"}
                                    className="w-6 h-6 rounded-full object-cover border border-white"
                                />
                            )}
                            <span>{user.name || user.username} Dashboard</span>
                        </Link>
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