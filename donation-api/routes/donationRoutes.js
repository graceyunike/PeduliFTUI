import express from 'express';
import { getDonations, getDonationById, createDonation, getDonationsByUserId, deleteDonation } from '../controllers/donationControllers.js';

const router = express.Router();

router.get('/', getDonations);
router.get('/user/:userId', getDonationsByUserId);
router.get('/:id', getDonationById);
router.post('/', createDonation);
router.delete('/:id', deleteDonation);

export default router;
