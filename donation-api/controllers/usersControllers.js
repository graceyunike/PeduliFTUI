import User from '../models/userModels.js';

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
        try{
        const { id } = req.params;
        const user = await User.findOne({ user_id: id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validasi input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, dan password harus diisi' });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        // Buat user dengan password yang akan di-hash oleh virtual setter
        const user = await User.create({
            name,
            email,
            password, // akan di-hash otomatis oleh userSchema.virtual
            //role: role || 'donor'
        });

        // Jangan return password hash
        const userResponse = user.toObject();
        delete userResponse.password_hash;

        res.status(201).json({
            message: 'User berhasil didaftarkan',
            user: userResponse
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
    const { id } = req.params;

    const user = await User.findOneAndUpdate({ user_id: id }, req.body,
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
}
catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
};

const deleteUser = async (req, res) => {
    try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ user_id: id });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
}
catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
};


export { getUsers, getUserById, createUser, updateUser, deleteUser };
