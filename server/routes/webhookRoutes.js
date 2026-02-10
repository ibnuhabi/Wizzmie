import express from "express";
import crypto from "crypto";
import db from "../db/connection.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            order_id,
            transaction_status,
            fraud_status,
            payment_type,
            gross_amount,
            signature_key,
        } = req.body;

        console.log("🔔 Webhook received:", req.body);

        // Verify signature (opsional untuk testing)
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        const hash = crypto
            .createHash("sha512")
            .update(`${order_id}${transaction_status}${gross_amount}${serverKey}`)
            .digest("hex");

        // if (hash !== signature_key) {
        //     return res.status(403).json({ success: false, message: "Invalid signature" });
        // }

        // Update payment status
        let paymentStatus = "pending";
        let orderStatus = "pending";

        if (transaction_status === "capture" || transaction_status === "settlement") {
            paymentStatus = "settlement";
            orderStatus = "processing";
        } else if (transaction_status === "pending") {
            paymentStatus = "pending";
        } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
            paymentStatus = transaction_status;
            orderStatus = "cancelled";
        }

        // Update payment
        await db.execute(
            `UPDATE payments pm
             JOIN orders o ON pm.order_id = o.id
             SET pm.status = ?, pm.method = ?
             WHERE o.order_code = ?`,
            [paymentStatus, payment_type, order_id]
        );

        // Update order
        await db.execute(
            `UPDATE orders SET status = ? WHERE order_code = ?`,
            [orderStatus, order_id]
        );

        console.log(`✅ Updated order ${order_id}: payment=${paymentStatus}, order=${orderStatus}`);

        res.json({ success: true, message: "Webhook processed" });
    } catch (error) {
        console.error("❌ Webhook Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;