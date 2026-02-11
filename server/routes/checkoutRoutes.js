import express from "express";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";
import db from "../db/connection.js";

dotenv.config();

const router = express.Router();

// Initialize Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { orderId, grossAmount, customer, itemDetails } = req.body;

    console.log("📦 Checkout Request:", req.body);

    // 1️⃣ VALIDASI INPUT
    if (!customer?.firstName || !customer?.email || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer data is required (firstName, email, phone)"
      });
    }

    if (!itemDetails || itemDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Item details are required"
      });
    }

    const product_id = itemDetails[0].id;
    const quantity = itemDetails[0].quantity;
    const price = itemDetails[0].price;

    // 2️⃣ GENERATE ORDER CODE
    const orderCode = orderId || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // 3️⃣ INSERT ORDER KE DATABASE
    const [orderResult] = await db.execute(
      `INSERT INTO orders (order_code, product_id, price, quantity, status) 
        VALUES (?, ?, ?, ?, 'pending')`,
      [orderCode, product_id, grossAmount, quantity]
    );

    const order_id = orderResult.insertId;
    console.log("✅ Order created with ID:", order_id);

    // 4️⃣ INSERT PAYMENT KE DATABASE
    const customerName = `${customer.firstName} ${customer.lastName || ''}`.trim();

    const [paymentResult] = await db.execute(
      `INSERT INTO payments (
          order_id, 
          customer_name, 
          customer_email, 
          customer_phone, 
          gateway,
          amount, 
          status
        ) VALUES (?, ?, ?, ?, 'midtrans', ?, 'pending')`,
      [order_id, customerName, customer.email, customer.phone, grossAmount]
    );

    console.log("✅ Payment record created with ID:", paymentResult.insertId);

    // 5️⃣ CREATE MIDTRANS TRANSACTION
    const parameter = {
      transaction_details: {
        order_id: orderCode,
        gross_amount: parseInt(grossAmount),
      },
      customer_details: {
        first_name: customer.firstName,
        last_name: customer.lastName || "",
        email: customer.email,
        phone: customer.phone,
      },
      item_details: itemDetails.map(item => ({
        id: item.id.toString(),
        price: parseInt(item.price),
        quantity: parseInt(item.quantity),
        name: item.name
      })),
      callbacks: {
        finish: "https://ungentlemanlike-hsiu-amphibologically.ngrok-free.dev/payment-success",
        error: "https://ungentlemanlike-hsiu-amphibologically.ngrok-free.dev/payment-error",
        pending: "https://ungentlemanlike-hsiu-amphibologically.ngrok-free.dev/payment-pending"
      }
    };

    console.log("🔄 Creating Midtrans transaction...");
    console.log("📤 Webhook URL: https://ungentlemanlike-hsiu-amphibologically.ngrok-free.dev/api/webhook/midtrans-notification");

    const transaction = await snap.createTransaction(parameter);

    console.log("✅ Midtrans transaction created:", transaction.token);

    // 6️⃣ UPDATE PAYMENT DENGAN TRANSACTION ID
    await db.execute(
      `UPDATE payments SET transaction_id = ? WHERE id = ?`,
      [transaction.token, paymentResult.insertId]
    );

    // 7️⃣ RETURN RESPONSE
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        order_id: order_id,
        order_code: orderCode
      }
    });

  } catch (error) {
    console.error("❌ Checkout Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message
    });
  }
});

export default router;