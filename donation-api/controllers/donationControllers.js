import Donation from '../models/donationModels.js';
import DonationCampaign from '../models/donationCampaignsModels.js';
import OrderMapping from '../models/orderMappingModel.js';

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findOne({ donation_id: id });
        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDonation = async (req, res) => {
    try {
        // Normalize possible user_id -> donor_id coming from different clients
        if (req.body.user_id && !req.body.donor_id) {
            req.body.donor_id = req.body.user_id;
        }

        const donation = await Donation.create(req.body);

        // After creating the donation, increment the related campaign's collected_amount
        try {
            const { campaign_id, amount } = req.body;
            if (campaign_id && typeof amount === 'number') {
                await DonationCampaign.findOneAndUpdate(
                    { campaign_id },
                    { $inc: { collected_amount: amount } },
                    { new: true }
                );
            }
        } catch (incErr) {
            console.error('Failed to increment campaign collected_amount', incErr);
        }

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDonationsByUserId = async (req, res) => {
    try {
            const userId = req.params.userId;
            // Find order mappings for this user to include donations created by Midtrans
            const mappings = await OrderMapping.find({ user_id: userId });
            const orderIds = mappings.map(m => m.order_id);

            // include both legacy `user_id`, `donor_id` fields and donations whose donation_id
            // matches an order id created by this user (e.g. ORDER-...)
            const donations = await Donation.find({
                $or: [
                    { donor_id: userId },
                    { user_id: userId },
                    { donation_id: { $in: orderIds } }
                ]
            }).sort({ createdAt: -1 });
            res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findOneAndDelete({ donation_id: id });
        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getDonations, getDonationById, createDonation, getDonationsByUserId, deleteDonation };
