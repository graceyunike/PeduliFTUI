import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Footer() {
    return (
        <footer className="w-full bg-[#13A3B5] text-white mt-20 pt-16 pb-10">

            {/* CONTENT AREA CENTERED, BUT FOOTER FULL WIDTH */}
            <div className="w-full max-w-[1600px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* LEFT — LOGO */}
                <div className="flex flex-col items-center md:items-start">
                    <img 
                        src={Logo}
                        alt="PeduliFTUI Logo"
                        className="h-20 w-auto mb-4"
                    />
                </div>

                {/* CENTER — Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-4">Quick Links</h3>
                    <div className="flex flex-col gap-3 text-xl">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/about" className="hover:underline">About Us</Link>
                        <Link to="/event-campaign" className="hover:underline">Events</Link>
                        <Link to="/sentiments" className="hover:underline">Sentiments</Link>
                    </div>
                </div>

                {/* RIGHT — Contacts */}
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-4">Contacts</h3>
                    <div className="flex flex-col gap-4 text-xl">

                        <a 
                            href="https://instagram.com/kharismapr_" 
                            target="_blank"
                            className="flex items-center gap-3 justify-center md:justify-start hover:underline"
                        >
                            <InstagramIcon />
                            @kharismapr_
                        </a>

                        <a 
                            href="https://instagram.com/grace.yunike" 
                            target="_blank"
                            className="flex items-center gap-3 justify-center md:justify-start hover:underline"
                        >
                            <InstagramIcon />
                            @grace.yunike
                        </a>

                        <a 
                            href="https://instagram.com/arsintakn" 
                            target="_blank"
                            className="flex items-center gap-3 justify-center md:justify-start hover:underline"
                        >
                            <InstagramIcon />
                            @arsintakn
                        </a>
                    </div>
                </div>

            </div>

            {/* FULL-WIDTH DIVIDER */}
            <div className="w-full mt-12 border-t border-white/40"></div>

            {/* COPYRIGHT */}
            <div className="w-full max-w-[1600px] mx-auto text-center text-lg pt-6 px-10">
                © 2025 Rekayasa Perangkat Lunak - Kelompok 16 | Kharisma Aprilia, Grace Yunike, Arsinta Kirana
            </div>

        </footer>
    );
}


/* Instagram Icon Component */
function InstagramIcon() {
    return (
        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"/>
        </svg>
    );
}
