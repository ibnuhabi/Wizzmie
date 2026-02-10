import express from "express";
import {
  createCheckout,
  // getCheckoutStatus,
  // handleNotification
} from "../controllers/checkoutController.js";

const router = express.Router();

// POST /api/checkout - Create new checkout & get snap token
router.post("/", createCheckout);

// GET /api/checkout/:id - Get checkout status (by order_id or order_code)
// router.get("/:id", getCheckoutStatus);

// // POST /api/checkout/notification - Midtrans webhook
// router.post("/notification", handleNotification);

export default router;