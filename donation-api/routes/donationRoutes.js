import express from 'express';
import { getDonations, getDonationById, createDonation, deleteDonation } from '../controllers/donationControllers.js';

const router = express.Router();

router.get('/', getDonations);
router.get('/:id', getDonationById);
router.post('/', createDonation);
router.delete('/:id', deleteDonation);

export default router;
