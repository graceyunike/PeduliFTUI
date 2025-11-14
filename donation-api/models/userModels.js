import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password_hash: {
        type: String,
        required: true,
        maxlength: 255
    },
    role: {
        type: String,
        enum: ['donor', 'admin', 'organizer'],
        default: 'donor',
        maxlength: 20
    },
    profile_picture: {
        type: String,
        maxlength: 255
    }
    }, {
    timestamps: true
    });

    userSchema.virtual('password')
    .set(function (value) {
        this._password = value;
        this.password_hash = bcrypt.hashSync(value, 10);
    })
    .get(function () {
        return this._password;
    });

const User = mongoose.model('User', userSchema);

export default User;
