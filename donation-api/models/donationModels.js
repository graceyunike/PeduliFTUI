import mongoose from 'mongoose';
import crypto from 'crypto';

const donationSchema = new mongoose.Schema({
    donation_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    donor_id: {
        type: String,
        required: false
    },
    campaign_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    anonymous: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
