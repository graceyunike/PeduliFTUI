import { useState } from 'react';
import '../PaymentPage.css';
import Navbar from '../Components/Navbar';

import logoPengmas from "../assets/logo-pengmas.png";
import logoPay from "../assets/logo-pay.png";
import logoVisa from '../assets/logo-visa.png';
import logoMastercard from '../assets/logo-mastercard.png';
import logoCreditCard from '../assets/logo-creditcard.png';

const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <>
            <Navbar />
            <div className="page-container">
                <main className="main-content">

                    {/* --- Info Kampanye & Progress Bar --- */}
                    <section className="campaign-info">
                        <h1>Berbagi dan Bermain Dengan Anak-Anak Panti Asuhan Bina Jaya</h1>

                        <div className="organizer">
                            <img src={logoPengmas} alt="Pengmas IME FTUI" />
                            <span>PENGMAS IME FTUI</span>
                        </div>

                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: '43%' }}></div>
                        </div>

                        <div className="progress-labels">
                            <span><strong>43%</strong> Terkumpul</span>
                            <span>Tujuan <strong>100%</strong></span>
                        </div>
                    </section>

                    {/* --- Area Konten 2 Kolom (Flexbox) --- */}
                    <section className="donation-area">

                        {/* KOLOM KIRI: Form Donasi */}
                        <div className="form-container donation-form">
                            <h2>Masukkan Jumlah Donasi</h2>
                            <input
                                type="text"
                                placeholder="Jumlah lain"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                            <div className="donation-type-buttons">
                                <button className="btn-online active">Donasi Online</button>
                                <button className="btn-offline">Donasi Offline</button>
                            </div>

                            <p>Metode Pembayaran</p>
                            <div className="payment-logos">
                                <img src={logoPay} alt="Pay" />
                                <img src={logoCreditCard} alt="Credit Card" />
                                <img src={logoVisa} alt="Visa" />
                                <img src={logoMastercard} alt="Mastercard" />
                            </div>

                            <select>
                                <option value="one-time">A One Time</option>
                                <option value="monthly">Monthly</option>
                            </select>

                            <button className="submit-donation">Donasi Sekarang</button>
                        </div>

                        {/* KOLOM KANAN: Form Pesan */}
                        <div className="form-container message-form">
                            <h2>Kirim Pesan</h2>

                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id="anonim"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                                <label htmlFor="anonim">Kirim sebagai anonim</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Nama"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <textarea
                                placeholder="Pesan"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            <button className="submit-message">Kirim</button>
                        </div>

                    </section>
                </main>
            </div>
        </>
    );
}

export default PaymentPage;