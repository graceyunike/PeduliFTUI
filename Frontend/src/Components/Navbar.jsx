import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[#13A3B5]/90 backdrop-blur-md shadow-sm">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[70px] px-6">

                {/* LEFT — LOGO */}
                <NavLink
                    to="/" className="flex items-center"
                >
                    <img 
                        src={Logo}
                        alt="PeduliFTUI Logo"
                        className="h-[48px] w-auto"
                    />
                </NavLink>

                {/* CENTER — MENU */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 text-white font-semibold text-[17px]">

                    <NavLink
                        to="/landingpage"
                        className={({ isActive }) =>
                            isActive ? "text-[#005384]" : "hover:text-[#003d63]"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/landingpage"
                        className={({ isActive }) =>
                            isActive ? "text-[#005384]" : "hover:text-[#003d63]"
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/event-campaign"
                        className={({ isActive }) =>
                            isActive ? "text-[#005384]" : "hover:text-[#003d63]"
                        }
                    >
                        Event Campaign
                    </NavLink>

                    <NavLink
                        to="/sentiments"
                        className={({ isActive }) =>
                            isActive ? "text-[#005384]" : "hover:text-[#003d63]"
                        }
                    >
                        Sentiments
                    </NavLink>

                </div>

                {/* RIGHT — DONATE + CONTACT */}
                <div className="flex items-center gap-6 text-white font-semibold text-[17px]">

                    <Link
                        to="/login"
                        className="bg-white text-[#005384] px-5 py-2 rounded-xl font-bold shadow hover:bg-[#f5f5f5] transition"
                    >
                        Donate
                    </Link>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-[#005384]" : "hover:text-[#003d63]"
                        }
                    >
                        Contact Us
                    </NavLink>
                </div>

            </div>

            <div className="md:hidden flex flex-wrap justify-center gap-5 py-3 text-white font-semibold text-[16px] bg-[#13A3B5]">
                <NavLink to="/landingpage" className="hover:text-[#003d63]">Home</NavLink>
                <NavLink to="/landingpage" className="hover:text-[#003d63]">About</NavLink>
                <NavLink to="/event-campaign" className="hover:text-[#003d63]">Event Campaign</NavLink>
                <NavLink to="/sentiments" className="hover:text-[#003d63]">Sentiments</NavLink>
                <NavLink to="/contact" className="hover:text-[#003d63]">Contact</NavLink>
                <Link to="/donate" className="bg-white text-[#005384] px-4 py-1 rounded-xl font-bold shadow">
                    Donate
                </Link>
            </div>

        </nav>
    );
}
