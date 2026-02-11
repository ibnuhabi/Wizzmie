import express from "express";
import crypto from "crypto";
import db from "../db/connection.js";

const router = express.Router();

// ✅ ENDPOINT: POST /api/webhook/midtrans-notification
router.post("/midtrans-notification", async (req, res) => {
    try {
        console.log("\n" + "=".repeat(60));
        console.log("🔔 MIDTRANS WEBHOOK RECEIVED");
        console.log("=".repeat(60));
        console.log("📦 Full Request Body:", JSON.stringify(req.body, null, 2));
        
        const {
            order_id,
            transaction_status,
            fraud_status,
            payment_type,
            gross_amount,
            signature_key,
            transaction_time,
            transaction_id,
            status_code
        } = req.body;

        console.log("\n📊 Parsed Data:");
        console.log("   - Order ID:", order_id);
        console.log("   - Transaction Status:", transaction_status);
        console.log("   - Status Code:", status_code);
        console.log("   - Payment Type:", payment_type);
        console.log("   - Gross Amount:", gross_amount);
        console.log("   - Fraud Status:", fraud_status);
        console.log("   - Transaction ID:", transaction_id);

        // 1️⃣ VERIFY SIGNATURE (Security Check)
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        
        if (!serverKey) {
            console.error("❌ MIDTRANS_SERVER_KEY not configured!");
            return res.status(500).json({ 
                success: false, 
                message: "Server configuration error" 
            });
        }

        // ⚠️ PENTING: Gunakan status_code bukan transaction_status
        const hash = crypto
            .createHash("sha512")
            .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
            .digest("hex");

        console.log("\n🔐 Signature Verification:");
        console.log("   - String to hash:", `${order_id}${status_code}${gross_amount}[SERVER_KEY]`);
        console.log("   - Received signature:", signature_key?.substring(0, 30) + "...");
        console.log("   - Expected signature:", hash?.substring(0, 30) + "...");
        console.log("   - Match:", hash === signature_key ? "✅ YES" : "❌ NO");

        if (hash !== signature_key) {
            console.error("❌ Invalid signature!");
            return res.status(403).json({ 
                success: false, 
                message: "Invalid signature" 
            });
        }

        console.log("✅ Signature valid");

        // 2️⃣ CHECK IF ORDER EXISTS
        console.log("\n🔍 Checking order existence...");
        const [existingOrder] = await db.execute(
            `SELECT o.id, o.status as current_order_status, 
                    p.id as payment_id, p.status as current_payment_status
             FROM orders o
             LEFT JOIN payments p ON o.id = p.order_id
             WHERE o.order_code = ?`,
            [order_id]
        );

        if (existingOrder.length === 0) {
            console.error("❌ Order not found:", order_id);
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }

        console.log("✅ Order found:");
        console.log("   - Order ID (DB):", existingOrder[0].id);
        console.log("   - Current Order Status:", existingOrder[0].current_order_status);
        console.log("   - Current Payment Status:", existingOrder[0].current_payment_status);

        // 3️⃣ DETERMINE STATUS BASED ON TRANSACTION STATUS
        console.log("\n📊 Determining new status...");
        
        let paymentStatus = "pending";
        let orderStatus = "pending";

        switch (transaction_status) {
            case "capture":
                if (fraud_status === "accept") {
                    paymentStatus = "settlement";
                    orderStatus = "processing";
                } else if (fraud_status === "challenge") {
                    paymentStatus = "challenge";
                    orderStatus = "pending";
                } else {
                    paymentStatus = "deny";
                    orderStatus = "cancelled";
                }
                break;
                
            case "settlement":
                paymentStatus = "settlement";
                orderStatus = "processing";
                break;
                
            case "pending":
                paymentStatus = "pending";
                orderStatus = "pending";
                break;
                
            case "deny":
                paymentStatus = "deny";
                orderStatus = "cancelled";
                break;
                
            case "expire":
                paymentStatus = "expire";
                orderStatus = "cancelled";
                break;
                
            case "cancel":
                paymentStatus = "cancel";
                orderStatus = "cancelled";
                break;
                
            case "refund":
                paymentStatus = "refund";
                orderStatus = "cancelled";
                break;
                
            default:
                console.warn("⚠️ Unknown transaction status:", transaction_status);
                paymentStatus = transaction_status;
                orderStatus = "pending";
        }

        console.log("   - New Payment Status:", paymentStatus);
        console.log("   - New Order Status:", orderStatus);

        // 4️⃣ PREVENT DUPLICATE UPDATES (Idempotency)
        const currentPaymentStatus = existingOrder[0].current_payment_status;
        if (currentPaymentStatus === "settlement" && paymentStatus !== "refund") {
            console.warn("⚠️ Payment already settled, ignoring update");
            return res.status(200).json({ 
                success: true, 
                message: "Payment already settled, no update needed" 
            });
        }

        // 5️⃣ UPDATE PAYMENT RECORD
        console.log("\n💰 Updating payment...");
        
        const [updatePayment] = await db.execute(
            `UPDATE payments pm
             JOIN orders o ON pm.order_id = o.id
             SET pm.status = ?, 
                 pm.method = ?,
                 pm.transaction_id = ?
             WHERE o.order_code = ?`,
            [paymentStatus, payment_type, transaction_id, order_id]
        );

        console.log("   - Payment rows affected:", updatePayment.affectedRows);

        if (updatePayment.affectedRows === 0) {
            console.warn("⚠️ No payment record updated");
        }

        // 6️⃣ UPDATE ORDER RECORD
        console.log("\n📦 Updating order...");
        
        const [updateOrder] = await db.execute(
            `UPDATE orders 
             SET status = ?, updated_at = NOW() 
             WHERE order_code = ?`,
            [orderStatus, order_id]
        );

        console.log("   - Order rows affected:", updateOrder.affectedRows);

        // 7️⃣ VERIFY UPDATE
        console.log("\n🔍 Verifying updates...");
        
        const [verifyData] = await db.execute(
            `SELECT 
                o.id,
                o.order_code,
                o.status as order_status,
                p.customer_name,
                p.status as payment_status,
                p.method,
                p.transaction_id
             FROM orders o
             LEFT JOIN payments p ON o.id = p.order_id
             WHERE o.order_code = ?`,
            [order_id]
        );

        if (verifyData.length > 0) {
            console.log("✅ Update verification SUCCESS:");
            console.log("   - Order Code:", verifyData[0].order_code);
            console.log("   - Order Status:", verifyData[0].order_status);
            console.log("   - Payment Status:", verifyData[0].payment_status);
            console.log("   - Payment Method:", verifyData[0].method);
            console.log("   - Transaction ID:", verifyData[0].transaction_id);
        } else {
            console.warn("⚠️ Verification failed - order not found");
        }

        // 8️⃣ SUCCESS RESPONSE
        console.log("\n🎉 WEBHOOK PROCESSED SUCCESSFULLY!");
        console.log("=".repeat(60) + "\n");

        // PENTING: Midtrans expects 200 OK
        res.status(200).json({ 
            success: true, 
            message: "Notification processed successfully",
            data: {
                order_code: order_id,
                order_status: orderStatus,
                payment_status: paymentStatus
            }
        });

    } catch (error) {
        console.error("\n❌❌❌ WEBHOOK PROCESSING FAILED!");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);
        console.log("=".repeat(60) + "\n");
        
        // Return 200 to prevent Midtrans retry
        res.status(200).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
    }
});

// ✅ ENDPOINT: GET /api/webhook/test
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Webhook endpoint is active",
        timestamp: new Date().toISOString(),
        endpoints: {
            notification: "/api/webhook/midtrans-notification"
        }
    });
});

// ✅ ENDPOINT: GET /api/webhook/check/:order_code
router.get("/check/:order_code", async (req, res) => {
    try {
        const { order_code } = req.params;
        
        const [result] = await db.execute(
            `SELECT 
                o.order_code,
                o.status as order_status,
                o.price,
                p.status as payment_status,
                p.method,
                p.transaction_id,
                p.customer_name,
                p.customer_email,
                o.created_at,
                o.updated_at
             FROM orders o
             LEFT JOIN payments p ON o.id = p.order_id
             WHERE o.order_code = ?`,
            [order_code]
        );

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error("Error checking order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to check order",
            error: error.message
        });
    }
});

export default router;