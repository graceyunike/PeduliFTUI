import { snap } from "../services/midtrans.js";

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

        return res.status(200).json({
            token: transaction.token
        });

    } catch (error) {
        console.error("Midtrans Error:", error);
        res.status(500).json({ error: "Failed to create midtrans transaction" });
    }
};
