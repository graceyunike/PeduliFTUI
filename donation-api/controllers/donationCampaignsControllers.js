import DonationCampaign from '../models/donationCampaignsModels.js';

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await DonationCampaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await DonationCampaign.findOne({ campaign_id: id });
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCampaign = async (req, res) => {
    try {
        const campaign = await DonationCampaign.create(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await DonationCampaign.findOneAndUpdate(
        { campaign_id: id },
        req.body,
        { new: true }
        );
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await DonationCampaign.findOneAndDelete({ campaign_id: id });
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign };
