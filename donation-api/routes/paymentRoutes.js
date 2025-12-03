import express from "express";
import { createTransaction } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-transaction", createTransaction);

export default router;
