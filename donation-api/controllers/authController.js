import dotenv from 'dotenv';
dotenv.config(); 

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek apakah email dan password dikirim
        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password wajib diisi' });
        }

        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Email tidak ditemukan' });
        }

        // Cek apakah password cocok
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Password salah' });
        }

        // Generate JWT token
        const token = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '1h' } 
        );


        // Kirim token & user info (tanpa password)
        res.status(200).json({
            message: 'Login berhasil',
            token,
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile_picture: user.profile_picture || ''
        }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
};

export { login };
