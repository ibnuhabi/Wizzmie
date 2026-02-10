import express from "express";
// import { authenticateAdmin } from "../middleware/auth.js";
import db from "../db/connection.js";

const router = express.Router();

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

// Midtrans Webhook Handler
router.post('/midtrans', async (req, res) => {
  try {
    const notification = req.body;

    // Verify signature
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key
    } = notification;

    const serverKey = MIDTRANS_SERVER_KEY;
    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex');

    if (hash !== signature_key) {
      console.log('Invalid signature');
      return res.status(403).json({ message: 'Invalid signature' });
    }

    // Get order from database by order_code
    const orderQuery = `SELECT id FROM orders WHERE order_code = $1`;
    const orderResult = await db.query(orderQuery, [order_id]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const dbOrderId = orderResult.rows[0].id;

    // Extract payment info from Midtrans
    const {
      transaction_status,
      fraud_status,
      transaction_id,
      payment_type,
      bank,
      va_numbers,
      permata_va_number,
      bca_va_number,
      bni_va_number
    } = notification;

    // Determine payment status
    let paymentStatus = 'pending';
    let orderStatus = 'pending';

    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        paymentStatus = 'settlement';
        orderStatus = 'processing';
      }
    } else if (transaction_status === 'settlement') {
      paymentStatus = 'settlement';
      orderStatus = 'processing';
    } else if (transaction_status === 'pending') {
      paymentStatus = 'pending';
      orderStatus = 'pending';
    } else if (transaction_status === 'deny') {
      paymentStatus = 'deny';
      orderStatus = 'cancelled';
    } else if (transaction_status === 'expire') {
      paymentStatus = 'expire';
      orderStatus = 'cancelled';
    } else if (transaction_status === 'cancel') {
      paymentStatus = 'cancel';
      orderStatus = 'cancelled';
    }

    // Determine gateway and method
    let gateway = 'midtrans';
    let method = payment_type || 'unknown';

    // Update payment record
    const updatePaymentQuery = `
      UPDATE payments
      SET 
        gateway = $1,
        method = $2,
        status = $3,
        transaction_id = $4,
        updated_at = NOW()
      WHERE order_id = $5
      RETURNING *
    `;

    const paymentResult = await db.query(updatePaymentQuery, [
      gateway,
      method,
      paymentStatus,
      transaction_id,
      dbOrderId
    ]);

    // If no payment record exists, create one
    if (paymentResult.rows.length === 0) {
      const insertPaymentQuery = `
        INSERT INTO payments (order_id, gateway, method, amount, status, transaction_id)
        SELECT $1, $2, $3, price, $4, $5 FROM orders WHERE id = $1
        RETURNING *
      `;
      
      await db.query(insertPaymentQuery, [
        dbOrderId,
        gateway,
        method,
        paymentStatus,
        transaction_id
      ]);
    }

    // Update order status
    const updateOrderQuery = `
      UPDATE orders
      SET status = $1, updated_at = NOW()
      WHERE id = $2
    `;

    await db.query(updateOrderQuery, [orderStatus, dbOrderId]);

    console.log(`Order ${order_id} updated: payment=${paymentStatus}, order=${orderStatus}`);

    res.json({ message: 'Notification processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router