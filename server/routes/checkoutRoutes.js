import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

// Init Snap client
const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true" || false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Endpoint generate Snap token
router.post("/", async (req, res) => {
    try {
        const { orderId, grossAmount, customer, itemDetails } = req.body;

        // Validasi input
        if (!orderId || !grossAmount || !customer) {
            return res.status(400).json({ 
                error: "Missing required fields",
                message: "orderId, grossAmount, dan customer wajib diisi" 
            });
        }

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            customer_details: {
                first_name: customer.firstName,
                last_name: customer.lastName || "",
                email: customer.email,
                phone: customer.phone,
            },
            // Tambahkan item_details jika ada
            ...(itemDetails && { item_details: itemDetails }),
            
            // Optional: Tambahkan enabled payments
            enabled_payments: [
                "credit_card",
                "bca_va",
                "bni_va",
                "bri_va",
                "permata_va",
                "other_va",
                "gopay",
                "shopeepay",
                "qris",
            ],
        };

        const transaction = await snap.createTransaction(parameter);
        
        res.json({ 
            token: transaction.token,
            redirect_url: transaction.redirect_url 
        });
    } catch (err) {
        console.error("Midtrans Error:", err);
        res.status(500).json({ 
            error: "Failed to create transaction",
            message: err.message 
        });
    }
});

// Optional: Endpoint untuk handle notification dari Midtrans
router.post("/notification", async (req, res) => {
    try {
        const notification = await snap.transaction.notification(req.body);
        
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const fraudStatus = notification.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Status: ${transactionStatus}. Fraud: ${fraudStatus}`);

        // TODO: Update order status di database
        // Contoh logic:
        if (transactionStatus === 'capture') {
            if (fraudStatus === 'accept') {
                // Set order status = success
                console.log('✅ Payment Success');
            }
        } else if (transactionStatus === 'settlement') {
            // Set order status = success
            console.log('✅ Payment Settled');
        } else if (transactionStatus === 'cancel' || 
                   transactionStatus === 'deny' || 
                   transactionStatus === 'expire') {
            // Set order status = failed
            console.log('❌ Payment Failed');
        } else if (transactionStatus === 'pending') {
            // Set order status = pending
            console.log('⏳ Payment Pending');
        }

        res.status(200).json({ status: 'OK' });
    } catch (err) {
        console.error('Notification Error:', err);
        res.status(500).json({ error: 'Notification failed' });
    }
});

// Optional: Endpoint untuk check status transaksi
router.get("/status/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const status = await snap.transaction.status(orderId);
        
        res.json({
            order_id: status.order_id,
            transaction_status: status.transaction_status,
            gross_amount: status.gross_amount,
            payment_type: status.payment_type,
            transaction_time: status.transaction_time,
        });
    } catch (err) {
        console.error('Status Check Error:', err);
        res.status(500).json({ 
            error: 'Failed to check status',
            message: err.message 
        });
    }
});

export default router;