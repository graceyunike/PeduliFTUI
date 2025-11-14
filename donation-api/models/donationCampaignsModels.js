import mongoose from 'mongoose';
import crypto from 'crypto';

const donationCampaignSchema = new mongoose.Schema({
    campaign_id: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 150
    },
    description: {
        type: String,
        required: true
    },
    goal_amount: {
        type: Number,
        required: true
    },
    collected_amount: {
        type: Number,
        default: 0
    },
    organizer_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'cancelled'],
        default: 'ongoing'
    }
    }, {
    timestamps: true
});

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);
export default DonationCampaign;
