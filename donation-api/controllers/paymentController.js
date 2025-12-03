import { snap } from "../services/midtrans.js";
import OrderMapping from '../models/orderMappingModel.js';

export const createTransaction = async (req, res) => {
    try {
        const { order_id, amount, donor_name, donor_email } = req.body;

        const parameter = {
            transaction_details: {
                order_id,
                gross_amount: amount,
            },
            customer_details: {
                first_name: donor_name || "Anonymous",
                email: donor_email || "noemail@example.com",
            }
        };

        const transaction = await snap.createTransaction(parameter);
        // Persist an order->user mapping so later webhook-created donations
        // can be associated with the user who started the transaction.
        try {
            const { user_id, campaign_id } = req.body;
            const orderIdToSave = order_id || req.body.order_id;
            const amountToSave = req.body.amount || parameter.transaction_details.gross_amount;
            if (orderIdToSave) {
                await OrderMapping.findOneAndUpdate(
                    { order_id: orderIdToSave },
                    { order_id: orderIdToSave, user_id: user_id || null, campaign_id: campaign_id || null, amount: amountToSave || null },
                    { upsert: true, new: true }
                );
            }
        } catch (saveErr) {
            console.warn('Failed to save order mapping', saveErr);
        }

        return res.status(200).json({ token: transaction.token });

    } catch (error) {
        console.error("Midtrans Error:", error);
        res.status(500).json({ error: "Failed to create midtrans transaction" });
    }
};
